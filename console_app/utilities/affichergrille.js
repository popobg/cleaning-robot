class AfficherGrille {
    constructor() {
    }

    Afficher(oGrille, rx, ry)
    {
        console.log("=========================");
        console.log();

        for (let y = 0; y < oGrille.hauteur; y++) {
            let ligne = "|";

            for (let x = 0; x < oGrille.largeur; x++) {
                // position du robot
                if (x === rx && y === ry) {
                    ligne += " R |";
                    continue;
                }

                if (oGrille.isDirty(x, y)) {
                    ligne += "   |";
                    continue;
                }

                ligne += " X |"
            }

            console.log(ligne);
        }

        console.log();
        console.log("=========================");
    }
}

module.exports = AfficherGrille;