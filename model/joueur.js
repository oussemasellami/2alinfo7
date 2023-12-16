const mongo = require("mongoose");
const Schema = mongo.Schema;
const Joueur = new Schema({
  pseudo: String,
  score: Number,
  sante: Number,
});

module.exports = mongo.model("joueur", Joueur);
