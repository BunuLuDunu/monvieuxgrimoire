// Importation du package bcrypt
const bcrypt = require('bcrypt');

// Importation du package JsonWebToken
const jwt = require('jsonwebtoken');

// Importation du model user
const User = require('../models/User');

// Fonction pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user =  new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Fonction pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        // Vérification si l'utilisateur a été trouvé
        if (user === null) {
            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect'});
        } else {
            // Si l'utilisateur a été trouvé, on compare le mot de passe de la base de donnée avec le mot de passe transmis
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect'});
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};