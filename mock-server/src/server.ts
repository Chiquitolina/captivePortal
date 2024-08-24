import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.put('/credentials', (req, res) => {
  // const { ssid, pass } = req.body

  // Mocked logic
  res.status(200).send({ message: 'Credentials were successfully updated.' })
})

app.put('/online', (req, res) => {
  // Mocked logic
  res.status(200).send({ message: 'ESP32 switched to online mode.' })
})

app.get('/leds', (req, res) => {

  res.status(200).send({ message: 'Ok!'})

})

app.put('/ios', (req, res) => {
  // Mocked logic
  // const { id, value } = req.body
  res.status(200).send({ message: `IO's state was successfully updated.` })
})

app.get('/ios', (req, res) => {
  // Simulación: Lista de dispositivos con sus estados
  const dispositivos = [
    { id: "1", value: 1 },
    { id: "2", value: 0 },
    { id: "3", value: 1 },
    { id: "4", value: 1 },

    // Agrega más dispositivos según sea necesario
  ];

  res.status(200).json(dispositivos);
});

const MAX_NETWORKS = 32;

app.get('/networks', (req, res) => {
 const startPointer = Number(req.query.startPointer) || 0;
  const remainingNetworks = MAX_NETWORKS - startPointer;
  const networksLength = remainingNetworks < 10 ? remainingNetworks : 10;

  // Función para generar un número aleatorio entre -100 y -1
  const generateRandomRSSI = () => Math.floor(Math.random() * 100) - 100;

 const networks = [
    {
        "ssid": "sc-9def",
        "rssi": -40
    },
    {
        "ssid": "DIRECT-7A-HP Laser 135w",
        "rssi": -51
    },
    {
        "ssid": "Growcast AP",
        "rssi": -51
    },
    {
        "ssid": "GC TEST",
        "rssi": -51
    },
    {
        "ssid": "AT_401_RAC_056905_WW_39e6",
        "rssi": -57
    },
    {
        "ssid": "INTERNET CASA  2.4",
        "rssi": -59
    },
    {
        "ssid": "FiberCorp WiFi793 2.4GHz",
        "rssi": -61
    },
    {
        "ssid": "Fibertel wifi 949-2.4GHz",
        "rssi": -74
    },
    {
        "ssid": "FRANCIA 2.4",
        "rssi": -76
    },
    {
        "ssid": "CASA-FRANCIA",
        "rssi": -77
    }
]
  
  Array.from({ length: networksLength }, (_, i) => ({
    ssid: `ssid_name${i + startPointer}`,
    rssi: generateRandomRSSI() // Aquí se llama a la función para generar el RSSI aleatorio
  }));

  res.status(200).send(networks);
});

app.get('/mac', (req, res) => {
  // Mocked logic
  res.status(200).send({ mac: 'XX:XX:XX:XX' })
})

app.get('/list', (req, res) => {
  // Mocked logic
  res.status(200).send([{ id: '1', name: 'name1' },
                        { id: '2', name: 'name2'}, 
                        { id: '3', name: 'name3' },
                        { id: '4', name: 'name4' }])
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
