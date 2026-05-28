const fs = require('node:fs');
const path = require('node:path');

const dataPath = path.join(__dirname, '../data.json');

const readData = () => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Erreur lors de la lecture du fichier data.json :", error);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Erreur lors de l'écriture dans le fichier data.json :", error);
    }
};

const TeamModel = {
    getAll: () => {
        return readData();
    },
    
    getByName: (name) => {
        const teams = readData();
        return teams.find(t => t.name.toLowerCase().includes(name.toLowerCase()));
    },
    
    create: (data) => {
        const teams = readData();
        
        const newTeam = {
            id: teams.length > 0 ? teams[teams.length - 1].id + 1 : 1,
            name: data.name,
            country: data.country,
            stadium: data.stadium || "Non spécifié"
        };
        
        teams.push(newTeam);
        writeData(teams);
        
        return newTeam;
    }
};

module.exports = TeamModel;
