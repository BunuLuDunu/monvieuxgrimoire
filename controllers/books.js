// Importation du modèle
const Book = require('../models/Book.js');

// Importation de file system pour avoir accès aux fonctions qui permettent de modifier le système de fichiers
const fs = require('fs');

// Controller pour créer un livre
exports.createBook = (req, res, next) => {
  // Récupérer les données de la requête front sous forme form-data et convertir en JSON
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  // Supprimer le champ userId pour que le client ne passe pas le userId d'une autre personne
  delete bookObject._userId;
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename.split('.')[0]}optimized.webp`;
  const book = new Book({
    ...bookObject,
    // Remplacer le userId extrait du token par le middleware d'authentification en base de données
    userId: req.auth.userId,
    // Résolution de l'url complète de l'image optimisée
    imageUrl: imageUrl,
    averageRating: bookObject.ratings[0].grade
  });
  book.save()
    .then(() => { res.status(201).json({ message: 'Livre enregistré' })})
    .catch(error => {res.statuts(400).json({ error })});
};

// Controller pour modifier un livre
exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  // Supprimer le champ userId pour que le client ne passe pas le userId d'une autre personne
  delete bookObject._userId;
  Book.findOne({_id: req.params.id})
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
      } else if (req.file) {
        const filename = book.imageUrl.split('/images')[1];
        fs.unlink(`images/${filename}`, () => { });     
      }
      Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Livre modifié' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

// Controller pour supprimer un livre
exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
  .then(book => {
    // Vérification pour savoir si l'utilisateur qui souhaite supprimer le livre est bien son créateur
    if (book.userId != req.auth.userId) {
      res.status(401).json({ message: 'Non-autorisé' });
    } else {
      // Suppression de l'image correspondante au livre
      const filename = book.imageUrl.split('/images')[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({ message: 'Livre supprimé' }))
          .catch(error => res.status(401).json({ error }));
      });
    }
  })
  .catch(error => res.status(500).json({ error }));
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

// Controller pour ajouter une note
exports.addRating = (req, res, next) => {
  const user = req.body.userId;
  Book.findOne({_id: req.params.id})
    .then(book => {
      // Vérification que l'utilisateur n'a pas déjà noté le livre
      if (book.ratings.find(rating => rating.userId === user)) {
        res.status(401).json({ message: 'Note déjà attribuée' })
      } else {
        const newRating = {
          userId: user,
          grade: req.body.rating,
          _id: req.body._id
        };
        const updatedRatings = [
          ...book.ratings,
          newRating
        ];

      // Calcul de la note moyenne d'un livre
      function calcAverageRating(ratings) {
        const sumRatings = ratings.reduce((sum, rating) => sum + rating.grade, 0);
        const average = sumRatings / ratings.length;
        return parseFloat(average.toFixed(2));
      };
      const updatedAverageRating = calcAverageRating(updatedRatings);

      Book.findOneAndUpdate(
        { id: req.params.id, 'ratings.userId': { $ne: user } },
        { $push: { ratings: newRating }, averageRating: updatedAverageRating },
        { new: true }
      )
        .then(updatedBook => res.status(201).json(updatedBook))
        .catch(error => res.status(401).json({ error }));
    };
  })
    .catch(error => res.status(401).json({ error }));
};

// Controller pour récupérer les livres les mieux notés
exports.getBestRating = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(401).json({ error }));
};