const UserModel = {
    async getAllGitHubUsers() {
        try {
            const response = await fetch('https://api.github.com/users', {
                headers: { 'User-Agent': 'NodeJS-Express-MVC-App' }
            });

            if (!response.ok) {
                throw new Error(`Erreur GitHub: ${response.status}`);
            }

            return await response.json(); 
        } catch (error) {
            console.error("Erreur Model:", error.message);
            throw error;
        }
    },

    async getUserByUsername(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`, {
                headers: { 'User-Agent': 'NodeJS-Express-MVC-App' }
            });

            if (!response.ok) {
                throw new Error(`Utilisateur ${username} non trouvé: ${response.status}`);
            }

            return await response.json(); 
        } catch (error) {
            console.error("Erreur Model (Single User):", error.message);
            throw error;
        }
    }
};

module.exports = UserModel;