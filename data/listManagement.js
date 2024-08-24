async function createList(
  dataFetcher, // Función para obtener los datos de las redes.
  containerId,
  // Función para obtener los datos de las redes.
  renderRow
) {
  let startPointer = 0;

  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Limpia el contenedor antes de cargar los datos.
  const loadMoreData = async () => {
    container.setAttribute("class", "falseCenterH");

    try {
      // Muestra el spinner mientras se cargan los datos
      const spinner = document.createElement("div");
      spinner.setAttribute("class", "spinner");
      spinner.id = "spinner";
      container.appendChild(spinner);

      const data = await dataFetcher(startPointer);

      if (data && data.length > 0) {
        const fragment = document.createDocumentFragment();

        data.forEach((item) => {
          const fila = renderRow(item);
          fragment.appendChild(fila);
        });

        container.removeAttribute("class", "centerH");

        // Elimina el spinner después de cargar los datos
        container.removeChild(spinner);

        container.appendChild(fragment);
        startPointer += data.length; // Aumenta startPointer basado en la cantidad de datos cargados.
      }
    } catch (error) {
      console.error("Error al cargar más datos:", error);
    }
  };

  if (containerId == "div-table-body-stp") {
    container.addEventListener("scroll", async () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        await loadMoreData();
      }
    });
  }

  await loadMoreData(); // Carga inicial de datos.
}
