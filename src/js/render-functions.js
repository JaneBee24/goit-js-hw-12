import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader"); 
let lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });

export function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="photo-card">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p><strong>Likes</strong> <span>${likes}</span></p>
                <p><strong>Views</strong> <span>${views}</span></p>
                <p><strong>Comments</strong> <span>${comments}</span></p>
                <p><strong>Downloads</strong> <span>${downloads}</span></p>
            </div>
        </li>
    `).join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
    smoothScroll();
}

export function clearGallery() {
    gallery.innerHTML = "";
}

function smoothScroll() {
    const firstCard = document.querySelector(".photo-card");
    if (firstCard) {
        const { height } = firstCard.getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: "smooth",
        });
    }
}

export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}
