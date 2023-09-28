import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
const galleryMarkup = galleryItems.map(createGalleryMarkup).join("");
gallery.insertAdjacentHTML("afterbegin", galleryMarkup);

gallery.addEventListener("click", (e) => {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  const image = e.target;
  const url = image.dataset.source;
  const alt = image.alt;

  const modal = createImageModal(url, alt);
  modal.show();
});

function createGalleryMarkup({ preview, original, description }) {
  return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
       alt="${description}"
      />
    </a>
  </li>      
`;
}

function createImageModal(url, alt) {
  const markup = `<img src="${url}" alt="${alt}"/>`;
  const modal = basicLightbox.create(markup, {
    onShow: () => {
      document.addEventListener("keydown", onEscCloseBinded);
    },

    onClose: () => {
      document.removeEventListener("keydown", onEscCloseBinded);
    },
  });

  const onEscClose = function (e) {
    if (e.code === "Escape") {
      this.close();
    }
  };
  const onEscCloseBinded = onEscClose.bind(modal);

  return modal;
}
