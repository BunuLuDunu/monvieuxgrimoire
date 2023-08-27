// Importation de mongoose
const mongoose = require('mongoose');

// Importation du validateur unique pour les titres de livres
const uniqueValidator = require('mongoose-unique-validator');

// Création du modèle de livre
const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: String, required: true },
            grade: { type: Number, required: true, min: 1, max: 5 }
        }
    ], 
    averageRating: { type: Number, default: 0 },
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);