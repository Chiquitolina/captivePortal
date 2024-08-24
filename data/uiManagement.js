 function createTestSection() {

  // Crear el elemento section y asignar ID
  const section = document.createElement("section");
  section.id = "test";

  // Crear estructura interna
  const centerHDiv = document.createElement("div");
  centerHDiv.className = "centerH";

  const tableContainerDiv = document.createElement("div");
  tableContainerDiv.className = "table-container";

  const infiniteTableDiv = document.createElement("div");
  infiniteTableDiv.className = "infinite-table";

  const tableHeaderDiv = document.createElement("div");
  tableHeaderDiv.className = "table-header"

  const headerRowDiv = document.createElement("div");
  headerRowDiv.className = "header-row";

  // Entradas/Salidas y Estado
  const ioDiv = document.createElement("div");
  const ioText = document.createElement("p");
  ioText.innerHTML = `<b>Entradas/Salidas<b/>`;
  ioText.id = 'label'
  ioDiv.setAttribute("class", "ioDiv");
  ioDiv.appendChild(ioText);

  const statusDiv = document.createElement("div");
  statusDiv.setAttribute('class', 'statusdiv')
  const textStatus = document.createElement("p");
  textStatus.id = 'label'
  textStatus.innerHTML = `<b>Estado<b/>`;
  statusDiv.appendChild(textStatus)

  // Cuerpo de la tabla
  const tableBodyDiv = document.createElement("div");
  tableBodyDiv.className = "table-body";
  tableBodyDiv.id = "div-table-body-ios";

  // Botón de Información
  const containerCnt = document.createElement('div')
  containerCnt.setAttribute('class', 'contCont')
  const containerInfo = document.createElement("div");
  containerInfo.setAttribute("class", "contInfo");
  const detailsButton = document.createElement("button");
  detailsButton.className = "btnTwo";
  detailsButton.id = "details";
  detailsButton.innerHTML = "<b>Información</b>";
  const testButton = document.createElement("button")
  testButton.className = "btnOne"
  testButton.id = "testT"
  testButton.innerHTML = "<b>Test Leds</b>";

  testButton.addEventListener('click', () => {
    toggleLed()
  })

  containerInfo.append(detailsButton);
  containerInfo.append(testButton)

  detailsButton.addEventListener("click", async () => {
    const qrCodeContent = await generateQRCode();
    const modal = createModal();
    blurBackgroundOnModals();
    modal.setContent(qrCodeContent);
    modal.show();
  });

  // Ensamblando la estructura
  headerRowDiv.appendChild(ioDiv);
  headerRowDiv.appendChild(statusDiv);

  tableHeaderDiv.appendChild(headerRowDiv);

  infiniteTableDiv.appendChild(tableHeaderDiv);
  infiniteTableDiv.appendChild(tableBodyDiv);

  tableContainerDiv.appendChild(infiniteTableDiv);

  centerHDiv.appendChild(tableContainerDiv);

  containerCnt.appendChild(containerInfo)

  section.appendChild(centerHDiv);
  section.appendChild(containerCnt);

  // Insertar el section en el documento
  // Asumiendo que quieres insertarlo al final del body
  const main = document.getElementById("main");
  main.appendChild(section);
}

 function createSetupSection() {
  // Crear el elemento section y asignar ID
  const section = document.createElement("section");
  section.id = "setup";

  // Crear estructura interna
  const centerHDiv = document.createElement("div");
  centerHDiv.className = "centerH";

  const tableContainerDiv = document.createElement("div");
  tableContainerDiv.className = "table-container";

  const infiniteTableDiv = document.createElement("div");
  infiniteTableDiv.className = "infinite-table";

  const tableHeaderDiv = document.createElement("div");
  tableHeaderDiv.className = "table-header";

  const headerRowDiv = document.createElement("div");
  headerRowDiv.className = "header-row";

  // Índice y Redes

  const networksDiv = document.createElement("div");

  const networkstext = document.createElement("p");
  networkstext.innerHTML = `<b>Redes</>`;
  networkstext.id = 'label'

  networksDiv.setAttribute("class", "centerV");

  networksDiv.appendChild(networkstext);

  const intDiv = document.createElement("div");
  intDiv.setAttribute("class", "centerV");
  const intText = document.createElement("p");
  intText.innerHTML = `<b>Intensidad de señal</>`;
  intText.id = 'label'


  // Cuerpo de la tabla
  const tableBodyDiv = document.createElement("div");
  tableBodyDiv.className = "table-body";
  tableBodyDiv.id = "div-table-body-stp";

  // Botón de Conexión Manual
  const manualButton = document.createElement("button");
  const containerManual = document.createElement("div");
  containerManual.setAttribute("class", "contManual");
  containerManual.appendChild(manualButton);

  manualButton.className = "btnOne";
  manualButton.id = "manual";
  manualButton.innerHTML = "<b>Conexión manual</b>";

  manualButton.addEventListener("click", () => {
    setupFormAndModal();
  });

  // Ensamblando la estructura
  headerRowDiv.appendChild(networksDiv);
  headerRowDiv.appendChild(intDiv);
  intDiv.appendChild(intText);

  tableHeaderDiv.appendChild(headerRowDiv);

  infiniteTableDiv.appendChild(tableHeaderDiv);
  infiniteTableDiv.appendChild(tableBodyDiv);

  tableContainerDiv.appendChild(infiniteTableDiv);

  centerHDiv.appendChild(tableContainerDiv);

  section.appendChild(centerHDiv);
  section.appendChild(containerManual);

  const main = document.getElementById("main");
  main.appendChild(section);
}

 function renderNetworksRow(element) {
  const fila = document.createElement("div");
  fila.classList.add("fila-de-red")

  const nombre = document.createElement("div");
  nombre.classList.add("nombre");
  nombre.textContent = element.ssid;

  const intensidad = document.createElement("div");
  intensidad.classList.add("centerV");
  const netContainer = document.createElement('div')
  const netStrength = document.createElement("p");
  netStrength.textContent = element.rssi + 'dBm';

  intensidad.appendChild(netStrength);

  const imgActualSignalStrength = document.createElement("div");

  // Asumiendo que `element.rssi` es el valor que quieres comprobar
  switch (true) {
    case element.rssi > -50:
      // Mejor señal
      imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3z"/>
    </svg>`;
    intensidad.appendChild(imgActualSignalStrength);
      break;
    case element.rssi > -65:
      // Señal media
      imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3m0 2c3.07 0 6.09.86 8.71 2.45l-1.94 2.43A13.6 13.6 0 0 0 12 8C9 8 6.68 9 5.21 9.84l-1.94-2.4A16.94 16.94 0 0 1 12 5z"/>
    </svg>`;
    intensidad.appendChild(imgActualSignalStrength);
      break;
    case element.rssi > -85:
      // Señal baja
      imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3m0 2c3.07 0 6.09.86 8.71 2.45l-3.21 3.98a11.32 11.32 0 0 0-11 0L3.27 7.45A16.94 16.94 0 0 1 12 5z"/>
    </svg>`;
    intensidad.appendChild(imgActualSignalStrength);
      break;
    default:
      imgActualSignalStrength.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 3A18.9 18.9 0 0 0 .38 7C4.41 12.06 7.89 16.37 12 21.5L23.65 7C20.32 4.41 16.22 3 12 3m0 2c3.07 0 6.09.86 8.71 2.45l-5.1 6.36a8.43 8.43 0 0 0-7.22-.01L3.27 7.45A16.94 16.94 0 0 1 12 5z"/>
  </svg>
  `;
      intensidad.appendChild(imgActualSignalStrength);
  }

  fila.addEventListener("click", () => setupFormAndModal(element.ssid, element.rssi));

  fila.appendChild(nombre);
  fila.appendChild(intensidad);

  return fila;
}

 function blurBackgroundOnModals() {
  const footer = document.getElementById("footer");
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const main = document.getElementById("main");

  const elements = [footer, header, nav, main];

  elements.forEach((element) => {
    element.setAttribute("class", "blur");
  });
}

 function quitBlurBackgroundOnModals() {
  const footer = document.getElementById("footer");
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const main = document.getElementById("main");

  const elements = [footer, header, nav, main];

  elements.forEach((element) => {
    element.setAttribute("class", "");
  });
}

 function renderIOsRow(element) {
  const fila = document.createElement("div");
  fila.classList.add("fila-de-red");

  const nombre = document.createElement("div");
  nombre.classList.add("nombre");
  nombre.textContent = element.name;

  const containerButtonIOsFila = document.createElement('div')
  containerButtonIOsFila.setAttribute('class', 'containerBtnIOs')
  const estado = document.createElement("button");
  estado.classList.add("btnios");
  estado.setAttribute("data-state", element.value.toString());

  estado.addEventListener("click", function () {
    const currentState = this.getAttribute("data-state");
    const newState = currentState === "0" ? "1" : "0";
    this.setAttribute("data-state", newState);
    setIOState(newState, element.id);
  });

  containerButtonIOsFila.appendChild(estado)

  fila.appendChild(nombre);
  fila.appendChild(containerButtonIOsFila);
  return fila;
}

function successAlert(message) {
  const notification = document.createElement("div");
  notification.classList.add("alert-success");
  notification.textContent = message;

  // Agregar la notificación al cuerpo del documento
  document.body.appendChild(notification);

  // Eliminar la notificación después de un tiempo
  setTimeout(() => {
    notification.remove();
  }, 5000); // Ajusta el tiempo según sea necesario
}

 function errorAlert(message) {
  const notification = document.createElement("div");
  notification.classList.add("alert-error");
  notification.textContent = message;

  // Agregar la notificación al cuerpo del documento
  document.body.appendChild(notification);

  // Eliminar la notificación después de un tiempo
  setTimeout(() => {
    notification.remove();
  }, 5000); // Ajusta el tiempo según sea necesario
}
