
 function createModal() {
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("role", "dialog");
  document.body.appendChild(modal);

  const modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");
  modal.appendChild(modalContent);

  const closeModalBtnn = document.createElement("button");
  closeModalBtnn.setAttribute('class', 'btnCerrar');
  closeModalBtnn.innerHTML = `<img width="20" src="./assets/closefkn.png">`;
  const btnCerrarCont = document.createElement('div');
  btnCerrarCont.setAttribute('class', 'btn-close-container');
  btnCerrarCont.appendChild(closeModalBtnn);

  closeModalBtnn.addEventListener("click", () => {
    const footer = document.getElementById("footer");
    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const main = document.getElementById("main");

    footer.setAttribute("class", "");
    header.setAttribute("class", "");
    nav.setAttribute("class", "");
    main.setAttribute("class", "");
    close();
  });

  const setContent = (content) => {
    modalContent.innerHTML = "";
    modalContent.appendChild(btnCerrarCont);
    modalContent.appendChild(content);
  };

  const show = () => {
    modal.classList.add("modal-show");
    document.body.classList.add("body-modal-open");
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);
  };

  const close = () => {
    modal.remove();
    document.body.classList.remove("body-modal-open");
    document.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("click", handleClickOutside);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      const footer = document.getElementById("footer");
      const header = document.getElementById("header");
      const nav = document.getElementById("nav");
      const main = document.getElementById("main");
    
      const elements = [footer, header, nav, main];
    
      elements.forEach((element) => {
        element.setAttribute("class", "noblur");
      });
      close();
    }
  };

  const handleClickOutside = (event) => {
    if (event.target === modal) {
      const footer = document.getElementById("footer");
      const header = document.getElementById("header");
      const nav = document.getElementById("nav");
      const main = document.getElementById("main");
    
      const elements = [footer, header, nav, main];
    
      elements.forEach((element) => {
        element.setAttribute("class", "noblur");
      });
      close();
    }
  };

  return { setContent, show, close };
}
