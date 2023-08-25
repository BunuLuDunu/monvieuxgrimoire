// Importation de mongoose
const mongoose = require('mongoose');

// Importation du package de validation pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail
const uniqueValidator = require('mongoose-unique-validator');

// Création du modèle d'utilisateur avec format d'email valide et mot de passe supérieur à 8 caractères
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, validate: {
        validator: (string) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string);
        }, 
        message: 'Cet email n\'est pas valide'
    }},
    password: { type: String, min: 8, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);