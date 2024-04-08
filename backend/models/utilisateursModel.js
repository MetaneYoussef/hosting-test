const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const watchlistItemSchema = new Schema({
    tmdbId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['films', 'series']
    },
    progress: {
        type: Number,
        default: 0
    }
}, { _id: false });

const utilisateurSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },
    prenom: {
        type: String,
        required: [true, 'Le prénom est obligatoire']
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        match: [/.+\@.+\..+/, 'Veuillez entrer un email valide']
    },
    mot_de_passe: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    watchlist: [watchlistItemSchema]
}, { timestamps: true });

utilisateurSchema.pre('save', async function(next) {
    if (!this.isModified('mot_de_passe')) return next();
    const salt = await bcrypt.genSalt(10);
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
    next();
});

utilisateurSchema.methods.matchMotDePasse = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.mot_de_passe);
};

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);
module.exports = Utilisateur;