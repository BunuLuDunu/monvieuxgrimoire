// Importation d'Express
const express = require('express');

// Création du router
const router = express.Router();

// Importation du controller de création de livre
const booksCtrl = require('../controllers/books.js');


// 
// ROUTES
// 

// Route pour créer un nouveau livre
router.post('/', booksCtrl.createBook);
// Route pour la modification d'un livre
router.put('/:id', booksCtrl.modifyBook);
// Route pour supprimer un livre
router.delete('/:id', booksCtrl.deleteBook);
// Route pour récupérer un livre unique
router.get('/:id', booksCtrl.getOneBook);
// Route pour récupérer tous les livres
router.get('/', booksCtrl.getAllBooks);

module.exports = router;