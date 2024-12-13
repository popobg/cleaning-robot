const Grille = require("./entites/grille.js");
const Robot = require("./entites/robot.js");
const AfficherGrille = require("./utilities/affichergrille.js");

(function () {
    const oGrille = new Grille();
    const robot = new Robot();
    const affichage = new AfficherGrille();

    let pos = robot.GetPosition();
    affichage.AfficherGrille(oGrille.grille, pos.GetX(), pos.GetY());

    while (!(pos.GetX() === (oGrille.largeur - 1) && pos.GetY() === (oGrille.hauteur - 1))) {
        robot.SeDeplacer(oGrille);

        pos = robot.GetPosition();

        if (oGrille.grille[pos.GetY()][pos.GetX()] === " ") {
            robot.Nettoyer(oGrille);
        }

        affichage.Afficher(oGrille.grille, pos.GetX(), pos.GetY());
    }
})();