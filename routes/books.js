// Importation d'Express
const express = require('express');

// Création du router
const router = express.Router();

// Importation des modèles
const Book = require('../models/Book.js');

// Route pour créer un nouveau livre
router.post('/', (req, res, next) => {
    const book = new Book({
          ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré'}))
        .catch(error => res.status(400).json({ error }));
  });
  
  // Route pour la modification d'un livre
  router.put('/:id', (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié' }))
      .catch(error => res.status(400).json({ error }));
  });
  
  // Route pour supprimer un livre
  router.delete('/:id', (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé' }))
      .catch(error => res.status(400).json({ error }));
  });
  
  // Route pour récupérer un livre unique
  router.get('/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  });
  
  // Route pour récupérer tous les livres
  router.get('/', (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = router;