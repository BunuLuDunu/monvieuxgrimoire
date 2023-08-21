// Ajout d'Express
const express = require('express');
const app = express();
app.use(express.json());

// Importation du router
const booksRoutes = require('./routes/books.js');

// Ajout de Mongoose et connection à MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://laurinesassano:monvieuxgrimoire@cluster0.t5wh6dv.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Ajout du middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/books', booksRoutes);

module.exports = app;