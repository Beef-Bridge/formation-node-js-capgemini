import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { writeFile, mkdir } from 'node:fs/promises'

const app = createInterface({ input, output });

const prenom = await app.question("Quel est votre prénom ? ");
const nom = await app.question("Quel est votre nom ? ");

console.log(`Bonjour ${prenom} ${nom}`);

const userData = {
    firstname: prenom,
    lastname: nom
};

await mkdir('users', { recursive: true });

await writeFile('users/users.json', JSON.stringify(userData), 'utf-8');
console.log(`Fichier $users.json mis à jours !`);

app.close();
