var joueur = require("../model/joueur");
var partie = require("../model/partie");

async function add(req, res, next) {
  try {
    const Joueur = new joueur({
      pseudo: req.body.pseudo,
      score: 0,
      sante: 100,
    });
    await Joueur.save();
    res.send("le nom de joueur :" + JSON.stringify(Joueur.pseudo));
  } catch (err) {
    console.log(err);
  }
}
async function getall(req, res, next) {
  try {
    const data = await joueur.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
}
async function getbyid(req, res, next) {
  try {
    const data = await joueur.findById(req.params.id);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
}
async function deletejoueur(req, res, next) {
  try {
    await joueur.findByIdAndDelete(req.params.id);
    res.send("deleted");
  } catch (err) {
    console.log(err);
  }
}

async function attaque(req, res, next) {
  try {
    const j1 = await joueur.findById(req.params.id1);
    const j2 = await joueur.findById(req.params.id2);
    score1 = j1.score + 20;
    sante1 = j2.sante - 10;
    const j1u = await joueur.findByIdAndUpdate(req.params.id1, {
      score: score1,
    });
    const j2u = await joueur.findByIdAndUpdate(req.params.id2, {
      sante: sante1,
    });
    res.send("ju1 :" + j1u + "ju2 :" + j2u);
  } catch (err) {
    console.log(err);
  }
}

async function addpartie(req, res, next) {
  try {
    const Partie = new partie({
      nom: req.body.nom,
      joueur_1: req.params.id1,
      joueur_2: req.params.id2,
      etat: "En cours",
    });
    await Partie.save();
    res.send("le nom de partie :" + JSON.stringify(Partie.nom));
  } catch (err) {
    console.log(err);
  }
}

async function addpartiesocket(data) {
  try {
    const Partie = new partie({
      nom: data.nom,
      joueur_1: data.id1,
      joueur_2: data.id2,
      etat: "En cours",
    });
    await Partie.save();
    // res.send("le nom de partie :" + JSON.stringify(Partie.nom));
  } catch (err) {
    console.log(err);
  }
}

async function affichesocket(data) {
  try {
    const j1 = await joueur.findById(data.id1);
    const j2 = await joueur.findById(data.id2);

    r = { j1: j1, j2: j2 };

    return r;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  add,
  getall,
  getbyid,
  deletejoueur,
  attaque,
  addpartie,
  addpartiesocket,
  affichesocket,
};
