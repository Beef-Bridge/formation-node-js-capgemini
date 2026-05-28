const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const api = express();
const filePath = path.join(__dirname, 'data.json');
const { loadEnvFile } = require("node:process");
loadEnvFile();
const { PORT } = process.env;

const documentation = {
  version: "1.0.0",
  routes: [
    {
      teams: [
        {
          route: "/teams",
          link: `http://localhost:${PORT}/teams`,
          method: "GET",
        },
        {
          route: "/teams",
          link: `http://localhost:${PORT}/teams`,
          method: "POST",
          sent: {
            data: {
              id: "number",
              name: "string",
              country: "string"
            },
            format: "JSON",
          },
        },
      ],
    },
  ],
};

api.get('/', (req, res) => {
    res.status(200).json(documentation);
});
api.get('/teams', async (req, res, next) => {
    try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const users = JSON.parse(fileContent);
    
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la lecture des utilisateurs :", error);
    res.status(200).json([]);
  }
});

api.post("/teams", (req, res, next) => {
  let newTeam = "";
  
  /**
   * Option 1 récupérer la data envoyé par le client et le parser avec JSON.parse(req.body)
  const data = req.body;
  console.log("request", req.headers, req.body);
  */
  
  // option 2 : écouter un l'événement data sur la request et concaténer au fur à mesure la data
  req.on("data", (chunk) => {
    newTeam += chunk;
  });

  // Quand toutes les données ont été reçu
  req.on("end", async () => {
    try {
        const team = JSON.parse(newTeam);
        // Insérer dans notre fichier data.json cette equipe
        const { id, name, country } = team;
        const newTeamData = { id, name, country };

        let fileContent = [];
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            fileContent = JSON.parse(data);
        } catch (readError) {
            fileContent = [];
        }

        fileContent.push(newTeamData);

        await fs.writeFile(filePath, JSON.stringify(fileContent, null, 2), 'utf-8');

        res.status(201).json({ success: true, message: "Team created" });
    } catch (error) {
      console.error("Erreur lors de l'écriture :", error);
      res.status(500).json({ success: false, message: "Erreur serveur lors de la sauvegarde" });
    }
  });
});

api.get("/teams/:name", async (req, res, next) => {
    try {
        const teamNameParam = req.params.name;

        const fileContent = await fs.readFile(filePath, 'utf-8');
        const teams = JSON.parse(fileContent);

        const folderTeam = teams.find(
            (t) => t.name.toLowerCase() === teamNameParam.toLowerCase()
        );

        if (!folderTeam) {
            return res.status(404).json({ 
            success: false, 
            message: `Team with name "${teamNameParam}" not found` 
            });
        }

        res.status(200).json(folderTeam);

    } catch (error) {
        console.error("Erreur lors de la recherche de l'équipe :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

api.put("/teams/:name", (req, res, next) => {
  const teamNameParam = req.params.name;
  let updatedDataRaw = "";

  req.on("data", (chunk) => {
    updatedDataRaw += chunk;
  });

  req.on("end", async () => {
    try {
      const updatedFields = JSON.parse(updatedDataRaw);

      const fileContent = await fs.readFile(filePath, 'utf-8');
      let teams = JSON.parse(fileContent);

      const teamIndex = teams.findIndex(
        (t) => t.name.toLowerCase() === teamNameParam.toLowerCase()
      );

      if (teamIndex === -1) {
        return res.status(404).json({ 
          success: false, 
          message: `Team "${teamNameParam}" not found` 
        });
      }

      teams[teamIndex] = { ...teams[teamIndex], ...updatedFields };

      await fs.writeFile(filePath, JSON.stringify(teams, null, 2), 'utf-8');

      res.status(200).json({ 
        success: true, 
        message: `Team "${teamNameParam}" updated successfully`,
        data: teams[teamIndex]
      });

    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });
});

api.delete("/teams/:name", async (req, res, next) => {
  try {
    const teamNameParam = req.params.name;

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const teams = JSON.parse(fileContent);

    const teamExists = teams.some(
      (t) => t.name.toLowerCase() === teamNameParam.toLowerCase()
    );

    if (!teamExists) {
      return res.status(404).json({ 
        success: false, 
        message: `Team "${teamNameParam}" not found` 
      });
    }

    const updatedTeams = teams.filter(
      (t) => t.name.toLowerCase() !== teamNameParam.toLowerCase()
    );

    await fs.writeFile(filePath, JSON.stringify(updatedTeams, null, 2), 'utf-8');

    res.status(200).json({ 
      success: true, 
      message: `Team "${teamNameParam}" has been successfully deleted` 
    });

  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

module.exports = api;
