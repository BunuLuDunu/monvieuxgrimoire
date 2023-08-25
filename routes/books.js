// Importation d'Express
const express = require('express');

// Création du router
const router = express.Router();

// Importation du middleware auth
const auth = require('../middleware/auth');

// Importation du middleware multer
const multer = require('../middleware/multerConfig');

// Importation du controller de création de livre
const booksCtrl = require('../controllers/books');


// 
// ROUTES
// 

// Route pour créer un nouveau livre
router.post('/', auth, multer, booksCtrl.createBook);

// Route pour récupérer tous les livres
router.get('/', booksCtrl.getAllBooks);

// Route pour récupérer les livres les mieux notés
router.get('/bestrating', booksCtrl.getBestRating);

// Route pour récupérer un livre unique
router.get('/:id', booksCtrl.getOneBook);

// Route pour la modification d'un livre
router.put('/:id', auth, multer, booksCtrl.modifyBook);

// Route pour supprimer un livre
router.delete('/:id', auth, booksCtrl.deleteBook);

// Route pour ajouter une note au livre
router.post('/:id/rating', auth, booksCtrl.addRating);


// Exportation du router
module.exports = router;