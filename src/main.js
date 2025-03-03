import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader"); 

let query = "";
let page = 1;
const perPage = 40;
let totalHits = 0;

function toggleLoader(show) {
    if (show) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    query = event.currentTarget.elements.query.value.trim();
    
    if (!query) {
        iziToast.warning({ title: "Увага", message: "Введіть запит для пошуку!" });
        return;
    }

    page = 1;
    clearGallery();
    loadMoreBtn.classList.add("hidden");
    toggleLoader(true); 

    try {
        const { images, total } = await fetchImages(query, page, perPage);
        totalHits = total;

        if (images.length === 0) {
            iziToast.error({ title: "Помилка", message: "Нічого не знайдено!" });
            return;
        }

        renderGallery(images);
        if (totalHits > perPage) {
            loadMoreBtn.classList.remove("hidden");
        }
    } catch (error) {
        iziToast.error({ title: "Помилка", message: "Не вдалося завантажити зображення." });
    } finally {
        toggleLoader(false); 
    }
});

loadMoreBtn.addEventListener("click", async () => {
    page++;
    toggleLoader(true); 

    try {
        const { images } = await fetchImages(query, page, perPage);
        renderGallery(images);

        if (page * perPage >= totalHits) {
            loadMoreBtn.classList.add("hidden");
            iziToast.info({ title: "Інформація", message: "Це останні зображення." });
        }

        const galleryItems = document.querySelectorAll(".gallery-item");
        if (galleryItems.length > 0) {
            const { height } = galleryItems[0].getBoundingClientRect();
            window.scrollBy({ top: height * 2, behavior: "smooth" });
        }
    } catch (error) {
        iziToast.error({ title: "Помилка", message: "Не вдалося завантажити зображення." });
    } finally {
        toggleLoader(false); 
    }
});
