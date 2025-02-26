import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
let lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });

export function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags }) => `
        <div class="gallery-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
        </div>
    `).join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function createGalleryMarkup(images) {
    return images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="image-info">
            <p><strong>Likes:</strong> ${likes}</p>
            <p><strong>Views:</strong> ${views}</p>
            <p><strong>Comments:</strong> ${comments}</p>
            <p><strong>Downloads:</strong> ${downloads}</p>
          </div>
        </li>
      `
      )
      .join('');
  }
  