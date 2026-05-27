import { createServer } from 'node:https'
import fs  from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const port = 8034

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathIndex = path.join(__dirname, 'pages', 'index.html');
const path404 = path.join(__dirname, 'pages', '404.html');

const pathKey = path.join(__dirname, '..', 'certifs', 'server-ex5.pem'); 
const pathCert = path.join(__dirname, '..', 'certifs', 'server-ex5.crt');

let options = {
    key: fs.readFileSync(pathKey),
    cert: fs.readFileSync(pathCert)
};

createServer(options, (req, res) => {
    const { method } = req;

    if (method === "GET") {
        switch (req.url) {
            case "/":
                fs.readFile(pathIndex, (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                        return res.end("Erreur lors de la lecture de l'index");
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    return res.end(data);
                });
                break;
                
            default:
                fs.readFile(path404, (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                        return res.end("Page non trouvée");
                    }
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    return res.end(data);
                });
                break;
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("demande mal formulé");
    }
}).listen(port, () => console.log(`https://localhost:${port}`));
