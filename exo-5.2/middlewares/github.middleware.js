// Vérifie si le format du username est valide
exports.checkUsernameFormat = (req, res, next) => {
    const { username } = req.params;
    
    if (username && username.length < 5) {
        return res.status(400).json({ error: "Le nom d'utilisateur est trop court." });
    }
    
    next();
};
