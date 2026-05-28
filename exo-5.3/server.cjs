const process = require('node:process');
const { createServer } = require('node:http')
const { loadEnvFile } = require('node:process')
const api = require('./api.cjs')
loadEnvFile()
const { PORT } = process.env
const app = createServer(api)
app.listen(PORT, () => {
    console.info(`Running on http://localhost:${PORT}`)
})