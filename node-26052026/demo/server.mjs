import { createServer } from 'node:http'

const PORT = 8088 // port disponible sur ma machine

createServer((req, res) => { // une callback de createServer => au moment ou le client se connecte
    res.end('<h1>Bonjour</h1>') // reponse retournée au client
}).listen(PORT, () => { // callback
    console.info(`Running at http://localhost:${PORT}`)
})
