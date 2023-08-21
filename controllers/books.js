// Importation du modèle
const Book = require('../models/Book.js');

// Controller pour créer un livre
exports.createBook = (req, res, next) => {
    const book = new Book({
          ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré'}))
        .catch(error => res.status(400).json({ error }));
  };

// Controller pour modifier un livre
exports.modifyBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié' }))
      .catch(error => res.status(400).json({ error }));
  };

// Controller pour supprimer un livre
exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé' }))
      .catch(error => res.status(400).json({ error }));
  };

// Controller pour récupérer un livre unique
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  };

// Controller pour récuperer tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
  };
