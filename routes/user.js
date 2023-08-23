// Importation d'Express
const express = require('express');

// Création du router
const router = express.Router();

// Importation du controller 
const userCtrl = require('../controllers/user');

// 
// ROUTES
// 

// Route pour enregistrer un nouvel utilisateur
router.post('/signup', userCtrl.signup);

// Route pour qu'un utilisateur puisse se connecter
router.post('/login', userCtrl.login);


// Exportation du router
module.exports = router;