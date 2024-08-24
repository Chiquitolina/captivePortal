function createWifiForm({ onSubmit, onSuccess, onError, initialValues = {} }) {
  const form = document.createElement("form");
  form.setAttribute("class", "wifiForm");

  const containerTitle = document.createElement("div");
  containerTitle.setAttribute("class", "contTitle");
  form.appendChild(containerTitle);

  const title = document.createElement("h1");
  title.setAttribute("class", "centerH");
  title.id = "titleid";
  title.innerHTML = "Red";

  const imgActualSignalStrength = document.createElement("div");
  imgActualSignalStrength.setAttribute("class", "imgRedForm");

  if (initialValues.rssi) {
    switch (true) {
      case initialValues.rssi > -50:
        // Mejor señal
        imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3z"/>
      </svg>`;
        title.appendChild(imgActualSignalStrength);
        break;
      case initialValues.rssi > -65:
        // Señal media
        imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3m0 2c3.07 0 6.09.86 8.71 2.45l-1.94 2.43A13.6 13.6 0 0 0 12 8C9 8 6.68 9 5.21 9.84l-1.94-2.4A16.94 16.94 0 0 1 12 5z"/>
      </svg>`;
        title.appendChild(imgActualSignalStrength);
        break;
      case initialValues.rssi > -85:
        // Señal baja
        imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3m0 2c3.07 0 6.09.86 8.71 2.45l-3.21 3.98a11.32 11.32 0 0 0-11 0L3.27 7.45A16.94 16.94 0 0 1 12 5z"/>
      </svg>`;
        title.appendChild(imgActualSignalStrength);
        break;
      default:
        imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3m0 2c3.07 0 6.09.86 8.71 2.45l-5.1 6.36a8.43 8.43 0 0 0-7.22-.01L3.27 7.45A16.94 16.94 0 0 1 12 5z"/>
    </svg>
    `;
        title.appendChild(imgActualSignalStrength);
    }
  }
  containerTitle.appendChild(title);

  // Input para el SSID

  const subForm = document.createElement("div");
  subForm.setAttribute('class', 'subform')

  const contInputSSID = document.createElement("div");
  const inputSSID = document.createElement("input");

  inputSSID.setAttribute("type", "text");
  inputSSID.setAttribute("name", "ssid");
  inputSSID.setAttribute("placeholder", "SSID de la red");
  inputSSID.required = true;
  if (initialValues.ssid) {
    inputSSID.value = initialValues.ssid; // Establece el valor inicial para el SSID
  }

  const labelRed = document.createElement("p");
  labelRed.textContent = "Nombre:";
  labelRed.setAttribute('class', 'cont-label')

  contInputSSID.appendChild(inputSSID);

  contInputSSID.appendChild(labelRed);

  contInputSSID.setAttribute('class', 'cont-label')
  subForm.appendChild(labelRed);

  subForm.appendChild(inputSSID);

  const inputPassword = document.createElement("input");
  inputPassword.setAttribute("type", "password");
  inputPassword.setAttribute("name", "password");
  inputPassword.setAttribute("placeholder", "Contraseña");
  inputPassword.required = true;

  const constLabelPass = document.createElement("div");
  const labelPass = document.createElement("p");
  constLabelPass.appendChild(labelPass);
  labelPass.setAttribute('class', 'cont-label')

  labelPass.textContent = "Contraseña:";

  subForm.appendChild(constLabelPass);
  const containerPass = document.createElement("div");
  containerPass.setAttribute("class", "containerInputs");
  const buttonPass = document.createElement("button");
  buttonPass.setAttribute('type', 'button')
  buttonPass.setAttribute("class", "btnCerrar");
  buttonPass.id = "btnPass";
  const imgEyePass = document.createElement("img");
  imgEyePass.setAttribute("src", "./assets/eyesee.png");
  imgEyePass.setAttribute("width", 25);
  buttonPass.appendChild(imgEyePass);
  buttonPass.addEventListener("click", () => {
    const type =
      inputPassword.getAttribute("type") === "password" ? "text" : "password";
    inputPassword.setAttribute("type", type);
    imgEyePass.setAttribute(
      "src",
      type === "password" ? "./assets/eyesee.png" : "./assets/eyehidden.png"
    );
  });

  containerPass.appendChild(inputPassword);
  containerPass.appendChild(constLabelPass);
  containerPass.appendChild(buttonPass)
  subForm.appendChild(labelPass)
  subForm.appendChild(containerPass);

  const submitButton = document.createElement("button");
  const contSubmit = document.createElement('div')
  contSubmit.setAttribute('class', 'cont-submit')
  submitButton.setAttribute("type", "submit");
  submitButton.id = "submit";
  submitButton.setAttribute("class", "btnOne");
  submitButton.innerHTML = `<b>Conectar</b>`;
  form.appendChild(subForm);
  contSubmit.appendChild(submitButton)
  form.appendChild(contSubmit);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await onSubmit(formValues);
      onSuccess();
    } catch (error) {
      onError();
    }
  });

  return form;
}

 function setupFormAndModal(networkSSID = "", networkRSSI = "") {
  const modal = createModal();

  const onSuccess = () => {
    successAlert("Credenciales actualizadas correctamente.");
    quitBlurBackgroundOnModals();
    modal.close(); // Cierra el modal después de una operación exitosa.
  };

  const onError = () => {
    errorAlert("Error al actualizar las credenciales.");
  };

  const initialValues = {
    ssid: networkSSID,
    rssi: networkRSSI,
  };

  const form = createWifiForm({
    onSubmit: setCredentials,
    onSuccess,
    onError,
    initialValues,
  });

  blurBackgroundOnModals();
  modal.setContent(form);
  modal.show();
}
