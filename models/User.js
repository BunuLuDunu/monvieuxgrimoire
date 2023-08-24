// Importation de mongoose
const mongoose = require('mongoose');

// Importation du package de validation pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail
const uniqueValidator = require('mongoose-unique-validator');

// Création du modèle d'utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);