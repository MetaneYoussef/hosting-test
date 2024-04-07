require('dotenv').config();
const express = require('express');
const router = express.Router();

// Vous avez déjà importé les contrôleurs, donc pas besoin de le faire à nouveau
const {
    discoverMovies,
    getmovie,
    searchMovies,
    hello
} = require('../controllers/filmsComtroller');

router.get('/', discoverMovies);
router.get('/hello', hello);
router.get('/search', searchMovies);
router.get('/:id', getmovie);

module.exports = router;