const Grille = require("./entites/grille.js");
const Robot = require("./entites/robot.js");
const AfficherGrille = require("./utilities/affichergrille.js");
const prompt = require('prompt-sync')({ signint: true });

// // test grille
// const oGrille = new Grille();
// console.log(oGrille.grille);

// // test robot
// const robot = new Robot();
// for (let i = 0; i < 24; i++) {
//     robot.SeDeplacer(oGrille);
//     robot.Nettoyer(oGrille);
// }
// console.log(oGrille.grille);

const oGrille = new Grille();
console.log(oGrille.grille);

const robot = new Robot();
const affichage = new AfficherGrille();

let pos = robot.GetPosition();

affichage.Afficher(oGrille.grille, pos.GetX(), pos.GetY());

robot.SeDeplacer(oGrille);

pos = robot.GetPosition();
affichage.Afficher(oGrille.grille, pos.GetX(), pos.GetY());