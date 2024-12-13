const Grille = require("./entites/grille.js");
const Robot = require("./entites/robot.js");
const AfficherGrille = require("./utilities/affichergrille.js");

(function () {
    const oGrille = new Grille();
    const robot = new Robot();
    const affichage = new AfficherGrille();

    let pos = robot.GetPosition();

    console.log("Le robot est à la position [0, 0].");
    affichage.Afficher(oGrille.grille, pos.GetX(), pos.GetY());

    // Nettoie la position initiale si nécessaire
    if (oGrille.isDirty(0, 0)) {
        robot.Nettoyer(oGrille);
    }

    // Permet d'effectuer une action par seconde
    const pause = setInterval(() => {
        if (pos.GetX() === (oGrille.largeur - 1) && pos.GetY() === (oGrille.hauteur - 1)) {
            clearInterval(pause);
            console.log("Nettoyage terminé !");
            return;
        }

        console.clear();

        robot.SeDeplacer(oGrille);

        pos = robot.GetPosition();

        if (oGrille.isDirty(pos.GetX(),pos.GetY())) {
            robot.Nettoyer(oGrille);
        }

        affichage.Afficher(oGrille.grille, pos.GetX(), pos.GetY());
    }, 1000);
})();