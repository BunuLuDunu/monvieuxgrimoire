// Importation d'Express
const express = require('express');

// Création du router
const router = express.Router();

// Importation du middleware
const auth = require('../middleware/auth');

// Importation du controller de création de livre
const booksCtrl = require('../controllers/books');


// 
// ROUTES
// 

// Route pour créer un nouveau livre
router.post('/', auth, booksCtrl.createBook);
// Route pour la modification d'un livre
router.put('/:id', auth, booksCtrl.modifyBook);
// Route pour supprimer un livre
router.delete('/:id', auth, booksCtrl.deleteBook);
// Route pour récupérer un livre unique
router.get('/:id', auth, booksCtrl.getOneBook);
// Route pour récupérer tous les livres
router.get('/', auth, booksCtrl.getAllBooks);


// Exportation du router
module.exports = router;