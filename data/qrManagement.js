 async function generateQRCode() {

  //creating and setting atr for containers
  //container general para log, mac, qr
  const qrcodeCont = document.createElement("div");
  qrcodeCont.id = 'qrCont'

  //container del qr solo
  const qr = document.createElement('div')
  qr.setAttribute('class', 'qr')

  try {
    
    //creating and setting atrs for logo
    const logo = document.createElement('img')
    logo.setAttribute('src', '../data/assets/logowhite.svg')
    logo.setAttribute('width', '120')

    //creating and setting atrs for mac content
    const mac = await getDeviceMac();
    const macContent = document.createElement("p");
    macContent.setAttribute('class', 'mac')
    const bolder = document.createElement("p");
    bolder.textContent = `IDD: ${mac}`;

    const contButtonsPrnt = document.createElement('div')
    contButtonsPrnt.setAttribute('class', 'contBtnsPrnt')

    const printQrBtnZPL = document.createElement('button')
    printQrBtnZPL.setAttribute('class', 'btnOne')
    printQrBtnZPL.textContent = 'Conectar impresora'
    printQrBtnZPL.id = 'connect'

    const printQrBtnZPLEvent = document.createElement('button')
    printQrBtnZPLEvent.setAttribute('class', 'btnOne')
    printQrBtnZPLEvent.textContent = 'Imprimir con ZPL'
    printQrBtnZPLEvent.id = 'connectEvent'

    let port, writer;

    printQrBtnZPL.addEventListener('click', async () => {
      try {
          port = await navigator.serial.requestPort().then((port) => {
            // Utilizar el puerto
          }).catch((error) => {
            console.error('Error:', error);
          });
          await port.open({ baudRate: 9600 }); 
  
          // Obtén un writer del puerto para enviar datos posteriormente
          const textEncoder = new TextEncoderStream();
          const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
          writer = textEncoder.writable.getWriter();
          
          successAlert('Impresora conectada correctamente')
      } catch (error) {
          errorAlert('Error al conectar con la impresora.', error);
      }
  });

  async function enviarComandoZPL(comandoZPL) {
    if (!writer) {
      errorAlert('No hay conexión establecida con la impresora.')
        console.error('No hay conexión establecida con la impresora.');
        return;
    }
    try {
        // Convierte el comando ZPL a un stream binario y lo envía
        await writer.write(comandoZPL);
        successAlert('Comando enviado a la impresora correctamente.')
    } catch (error) {
        errorAlert('Error al inviar la impresión.')
    }
}

  printQrBtnZPLEvent.addEventListener('click', async () => {
    const comandoZPL = '^XA\n^FO100,100\n^BQN,2,10\n^FDQA,YourTextHere^FS\n^XZ'; // Ejemplo de comando ZPL
    
    await enviarComandoZPL(comandoZPL); // Llamar a la función enviarComandoZPL con el comando ZPL
});

  contButtonsPrnt.appendChild(printQrBtnZPL)

  contButtonsPrnt.appendChild(printQrBtnZPLEvent)

    //creating and setting atrs for print button  
    const printQrBtn = document.createElement('button')
    printQrBtn.setAttribute('class', 'btnOne')
    printQrBtn.textContent = 'Imprimir'
    printQrBtn.id = 'printqrbtn'

    //print event
    printQrBtn.addEventListener('click', () => {
      printQrBtn.textContent = ''
      printQr(printQrBtn)
      printQrBtn.textContent = 'Imprimir'

    })

    //appending elments to general container
    macContent.appendChild(bolder);

    //generating qr and saving it on qrcont, then qr cont is going teo be append to qr
    new QRCode(qr, {
      text: `https://growcast.io/sign-up?idd=${mac}`,
      width: 180,
      height: 180,
      colorDark: '#2C3331', // Color oscuro para los módulos del código QR
      colorLight: "#FFFFFF", // Color claro (blanco) para el fondo del código QR
      correctLevel: QRCode.CorrectLevel.L,
    });
    contButtonsPrnt.appendChild(printQrBtn)
    qrcodeCont.appendChild(logo)
    qrcodeCont.appendChild(macContent)
    qrcodeCont.appendChild(qr);
    qrcodeCont.appendChild(contButtonsPrnt)



    return qrcodeCont;
  } catch (error) {
    console.error("No se pudo generar el código QR:", error);
    const errorElement = document.createElement("p");
    errorElement.textContent = "Error generando el código QR.";
    qrcodeCont.appendChild(errorElement);
    return qrcodeCont;
  }


}
function printQr() {
  // Obtén el HTML de la div que quieres imprimir
  let contenido = document.getElementById('qrCont').innerHTML;
  
  // Crea una nueva ventana
  let ventanaImpresion = window.open('', '_blank', 'height=400,width=600');
  
  // Escribe el HTML y los estilos CSS en la nueva ventana
  ventanaImpresion.document.write(`
    <html>
      <head>
        <style>
          body, html {
            margin: 0;
            margin-top: 0.5rem;
            padding: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
              
          }
          /* Asegura que no haya espacios adicionales dentro de cualquier elemento */
          *, *::before, *::after {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${contenido}
      </body>
    </html>
  `);
  
  ventanaImpresion.document.close(); // Necesario para que el navegador reconozca la carga completa de la página
  ventanaImpresion.focus(); // Necesario para navegadores y situaciones específicas
  
  // Espera a que se cargue el contenido y luego imprime
  ventanaImpresion.onload = function () {
    setTimeout(function() { // Se añade un breve retardo para asegurar la carga completa
      ventanaImpresion.print(); // Imprime el contenido de la ventana
      ventanaImpresion.close(); // Cierra la ventana después de imprimir
    }, 500); // Ajusta este tiempo según sea necesario
  };
}

async function enviarComandoZPL(comandoZPL) {
  if (!writer) {
      errorAlert('No hay conexión establecida con la impresora.');
      return;
  }
  try {
      // Convierte el comando ZPL a un stream binario y lo envía
      await writer.write(comandoZPL);
      successAlert('Comando ZPL enviado a la impresora.');
  } catch (error) {
      errorAlert('Error al enviar comando ZPL:', error);
  }
}


