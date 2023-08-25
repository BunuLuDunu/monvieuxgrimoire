// Importation de JsonWebToken
const jwt = require('jsonwebtoken');

// Fonction middleware
module.exports = (req, res, next) => {
    // Récupération du token
    try {
        // Récupération du header et division de la chaîne de caractères en un tableau autour de l'espace entre bearer et le token
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // Ajout de la valeur userId à l'objet request qui sera transmis aux routes
        req.auth = {
            userId: userId
        };
    } catch(error) {
        res.status(401).json({ error });
    }

    next();
};