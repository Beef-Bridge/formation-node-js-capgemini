import { createServer } from 'node:http'

const port = 8083
createServer((req, res) => {
    const response200 = JSON.stringify({
        "message":"success"
    })
    const response404 = JSON.stringify({
        "message":"not found"
    })

    switch (req.url) {
        case "/":
            res.writeHead(200)
            res.write(response200)
            break
        default:
            res.writeHead(404)
            res.write(response404)
            break
    }
    res.end();
}).listen(port, () => console.log(`http://localhost:${port}`));
