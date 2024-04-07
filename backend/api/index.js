// require('dotenv').config();

// const fs = require('fs');
// // const https = require('https'); // Commenté pour désactiver HTTPS
const express = require('express');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const cors = require('cors');
// const morgan = require('morgan');
// const winston = require('./config/winston');
// const rateLimit = require('./utils/rateLimit');
// const errorHandler = require('./middleware/errorMiddleware');
// const verifyToken = require('./middleware/authMiddleware');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// const utilisateursRoutes = require('./routes/utilisateurs');
// const filmsRoutes = require('./routes/films');
// const acteursRoutes = require('./routes/acteurs');
// const seriesRoutes = require('./routes/series');
// const authRoutes = require('./routes/authRoutes');

const app = express();
// const mongoose = require('mongoose')
// const cors = require('cors')
// const RegisterModel = require('./models/Register')


// Logging des requêtes HTTP avec Morgan et Winston
// app.use(morgan('combined', { stream: { write: (message) => winston.info(message.trim()) } }));

// Limite le taux de requêtes pour prévenir les attaques DDoS ou de force brute
// app.use(rateLimit);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});
// app.use('/api/authRoutes', authRoutes);
// app.use('/api/utilisateurs', utilisateursRoutes);
// app.use('/api/films', filmsRoutes);
// app.use('/api/acteurs', acteursRoutes);
// app.use('/api/series', seriesRoutes);

// // Integration de Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Gestion globale des erreurs
// app.use(errorHandler);

// Connexion à MongoDB et démarrage du serveur

// mongoose.connect(process.env.DBURI)
//     .catch((err) => winston.error(err.message));

app.listen(4000, () => {
    console.log('HTTP Server running on port  4000');
});