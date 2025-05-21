import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.currentTarget.elements["query"].value.trim();

  if (!query) {
    iziToast.warning({ title: "Увага", message: "Введіть запит для пошуку!" });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { images, total } = await getImagesByQuery(query, page, perPage);
    totalHits = total;

    if (images.length === 0) {
      iziToast.info({
        title: "Інформація",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    createGallery(images);

    if (totalHits > page * perPage) showLoadMoreButton();
  } catch (error) {
    iziToast.error({ title: "Помилка", message: "Не вдалося завантажити зображення." });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page++;
  showLoader();

  try {
    const { images } = await getImagesByQuery(query, page, perPage);
    createGallery(images);

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ title: "Інформація", message: "We're sorry, but you've reached the end of search results." });
    }

    const { height } = document.querySelector(".gallery-item").getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: "smooth" });
  } catch (error) {
    iziToast.error({ title: "Помилка", message: "Не вдалося завантажити зображення." });
  } finally {
    hideLoader();
  }
});