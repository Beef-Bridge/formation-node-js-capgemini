const GithubUserModel = require('../models/githubUsers');

const GithubUserController = {
    async displayUsersList(req, res) {
        try {
            const githubUsers = await GithubUserModel.getAllGitHubUsers();

            res.render('githubUsers', { title: 'github Users' , githubUsers: githubUsers });
        } catch (error) {
            res.status(500).send("Erreur lors du chargement des utilisateurs.");
        }
    },

    async displayUserDetail(req, res) {
        try {
            const username = req.params.username;
            
            const githubUser = await GithubUserModel.getUserByUsername(username);

            res.render('githubUserDetail', { title: 'github User' , githubUser: githubUser });
        } catch (error) {
            res.status(404).send("Utilisateur non trouvé sur GitHub.");
        }
    }
};

module.exports = GithubUserController;