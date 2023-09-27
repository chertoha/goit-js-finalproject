import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

const images = galleryItems
  .map(
    ({ preview, original, description }) => `
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
`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", images);

gallery.addEventListener("click", (e) => {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  const image = e.target;
  const url = image.dataset.source;
  const alt = image.alt;

  const modal = basicLightbox.create(
    `
    <div class="modal">
       <img src="${url}" alt="${alt}"/>
    </div>
`,
    {
      onShow: (modal) => {
        console.log("show");
        // toggleListener(modal, true);
        document.addEventListener("keydown", onModalEscClose);
      },

      onClose: (modal) => {
        console.log("close");
        // toggleListener(modal, false);
        document.removeEventListener("keydown", onModalEscClose);
      },
    }
  );

  function onModalEscClose(e) {
    if (e.code === "Escape") {
      modal.close();
    }
  }

  modal.show();
});
