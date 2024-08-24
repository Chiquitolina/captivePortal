const baseURL = "http://localhost:3000";

const endpoints = {
  networks: "networks",
  listIOs: "list",
  setIOs: "ios",
  getIOsState: "ios",
  setCredentials: "credentials",
  mac: "mac",
  leds: "leds",
};

async function fetchData(endpoint, options = {}) {
  const url = `${baseURL}/${endpoint}`;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
async function getDeviceMac() {
  const data = await fetchData(endpoints.mac);
  if (typeof data.mac !== "string" || !data.mac) {
    throw new Error("La dirección MAC obtenida no es válida");
  }
  return data.mac;
}

async function getNetworks(startPointer) {

  const delayPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resuelve la promesa después de 3 segundos
    }, 1000);
  });

  // Esperar a que se resuelva la promesa de retraso
  await delayPromise;

  const url = `networks?startPointer=${startPointer}`;

  const data = await fetchData(url);

  if (!Array.isArray(data)) {
    throw new Error("La respuesta obtenida no es un array");
  }

  return data;
}

async function listIOs() {
  
  const delayPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resuelve la promesa después de 3 segundos
    }, 1000);
  });

  // Esperar a que se resuelva la promesa de retraso
  await delayPromise;

  const data = await fetchData(endpoints.listIOs);

  if (!Array.isArray(data)) {
    throw new Error("La respuesta obtenida no es un array.");
  }


  return data;
}

async function setIOState(state, id) {
  const reqData = {
    id: id,
    value: state,
  };

  const reqOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  };

  const data = await fetchData(endpoints.setIOs, reqOptions);
  return data;
}

async function getIOsState() {
  const data = await fetchData(endpoints.getIOsState);

  if (!Array.isArray(data)) {
    throw new Error("La respuesta obtenida no es un array");
  }

  return data;
}

async function toggleLed() {
  const endpoint = endpoints.leds;

  const data = await fetchData(endpoint)
  
  if (!data) {
    errorAlert('Error el testear los leds.')
  }

  successAlert('Leds testeados correctamente.')

  return data

}

async function setCredentials(credentials) {
  const endpoint = endpoints.setCredentials;

  return await fetchData(endpoint, {
    method: "PUT",
    body: JSON.stringify(credentials),
  });
}

async function getListWithValues() {
  try {
    const listData = await listIOs();
    const iosData = await getIOsState();

    const combinedData = listData.map((listItem) => {
      const iosItem = iosData.find((ios) => ios.id === listItem.id);
      return { ...listItem, value: iosItem ? iosItem.value : null };
    });

    return combinedData;
  } catch (error) {
    console.error("Error combining data:", error);
  }
}
