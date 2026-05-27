import { createServer } from 'node:http';
import { readFile } from 'node:fs'
import { writeFile } from 'node:fs/promises'

const PORT = 8088;

createServer((req, res) => {
  readFile('index.html', 'utf-8')
    .then((content) => {
      res.end(content);
    })
    .catch((error) => {
      res.end(`Erreur interne du serveur : ${error.message}`);
    });
}).listen(PORT, () => {
  console.info(`🌍 URL : http://localhost:${PORT}`);
});

const htmlTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lecture/écriture avec Node</title>
</head>
<body>
  <h1>Module fs</h1>
</body>
</html>`

await writeFile('index.html', htmlTemplate, 'utf-8')
    .then(() => {
        console.info('fichier créé!')
    })
    .catch((error) => {
        console.error(`Erreur durant l'ecriture du fichier : ${error.message}`)
    })
