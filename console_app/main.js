const Grille = require("./entities/grille.js");
const Robot = require("./entities/robot.js");
const AfficherGrille = require("./utilities/afficherGrille.js");

(function () {
    const oGrille = new Grille();
    const robot = new Robot(5, 15);
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
        if (oGrille.GetCasesSales().length === 0 || robot.impossible) {
            clearInterval(pause);
            if (!robot.impossible) {
                console.log("Nettoyage terminé !");
            }
            else {
                console.log("Fin de nettoyage impossible.");
            }
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