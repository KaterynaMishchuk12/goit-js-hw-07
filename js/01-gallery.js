import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
const galleryMarkup = createGalleryItemsMarkup(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

galleryEl.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const currentItemSrc = event.target.dataset.source;

  const instance = basicLightbox.create(
    `<img width ="1280" height="auto" src="${currentItemSrc}">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },

      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );
  instance.show();

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = "Escape";
    if (event.code === ESC_KEY_CODE) {
      instance.close();
    }
  }
}

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
<a class="gallery__link" href="${original}g">
   <img
      class="gallery__image"
      src="${preview}"
       data-source="${original}"
      alt="${description}"
     />
   </a>
 </li>`;
    })
    .join("");
}
