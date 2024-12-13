const Grille = require("./entites/grille.js");
const Robot = require("./entites/robot.js");
const prompt = require('prompt-sync')({ signint: true });

// test grille
const oGrille = new Grille();
console.log(oGrille.grille);

// test robot
const robot = new Robot();
for (let i = 0; i < 24; i++) {
    robot.SeDeplacer(oGrille);
    robot.Nettoyer(oGrille);
}
console.log(oGrille.grille);