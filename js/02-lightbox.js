import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector(".gallery");

const makeGalleryCard = ({ preview, original, description }) =>
  `
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" 
      />
    </a>
    `;

const markup = galleryItems.map((item) => makeGalleryCard(item)).join("");

galleryEl.insertAdjacentHTML("beforeend", markup);

var lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
