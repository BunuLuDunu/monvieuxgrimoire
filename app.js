// Ajout d'Express
const express = require('express');
const app = express();
app.use(express.json());


// Ajout de Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://laurinesassano:monvieuxgrimoire@cluster0.t5wh6dv.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;