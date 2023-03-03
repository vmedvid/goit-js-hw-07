import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector(".gallery");

const makeGalleryCard = ({ preview, original, description }) =>
  `
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`;

const markup = galleryItems.map((item) => makeGalleryCard(item)).join("");

galleryEl.insertAdjacentHTML("beforeend", markup);

galleryEl.addEventListener("click", clickOnGallery);

function clickOnGallery(event) {
  event.preventDefault();

  if (event.target === galleryEl) {
    return;
  }
  const currentItem = event.target.closest(".gallery__item");
  const currentImage = currentItem.querySelector(".gallery__image");
  const urlOfOriginalCurrentImage = currentImage.dataset.source;
  const altOfOriginalCurrentImage = currentImage.getAttribute("alt");

  const instance = basicLightbox.create(
    `
    <div class="modal">
        <img
      src="${urlOfOriginalCurrentImage}"
      alt="${altOfOriginalCurrentImage}"
    />
    </div>
`,
    {
      onShow: (instance) => {
        instance.element().querySelector("img").onclick = instance.close;
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );
  instance.show();

  window.addEventListener("keydown", onEscKeyPress);

  function onEscKeyPress(event) {
    console.log(event);
    if (event.code !== "Escape") {
      return;
    }
    instance.close(() => window.removeEventListener("keydown", onEscKeyPress));
  }
}
