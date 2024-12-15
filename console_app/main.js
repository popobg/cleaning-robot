const Grille = require("./entites/grille.js");
const Robot = require("./entites/robot.js");
const AfficherGrille = require("./utilities/afficherGrille.js");

(function () {
    const oGrille = new Grille();
    const robot = new Robot();
    const affichage = new AfficherGrille();

    let pos = robot.GetPosition();

    console.log("Le robot est à la position [0, 0].");
    // Nettoie la position initiale si nécessaire
    if (oGrille.isDirty(0, 0)) {
        robot.Nettoyer(oGrille);
    }

    affichage.Afficher(oGrille, pos.GetX(), pos.GetY());

    // Permet d'effectuer une action par seconde
    const pause = setInterval(() => {
        // Condition pour mettre fin à setInterval
        if (oGrille.GetCasesSales().length === 0) {
            clearInterval(pause);
            console.log("Nettoyage terminé !");
            return;
        }

        console.clear();

        // robot.SeDeplacer(oGrille);
        robot.SeDeplacer(oGrille.GetCasesSales());
        pos = robot.GetPosition();

        if (oGrille.isDirty(pos.GetX(), pos.GetY())) {
            robot.Nettoyer(oGrille);
        }

        affichage.Afficher(oGrille, pos.GetX(), pos.GetY());
    }, 1000);
})();