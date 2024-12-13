class AfficherGrille {
    constructor() {
    }

    Afficher(grille, rx,ry)
    {
        console.log("=========================");
        console.log();

        // console.clear();
        grille.forEach((ligne, y) => {
        const ligneAffichee = ligne.map((caseGrille, x) =>
        x === rx && y === ry ? "R" : caseGrille
            );
        console.log("|" + ligneAffichee.join("|") + "|");
        });

        console.log();
        console.log("=========================");
    }
}

module.exports = AfficherGrille;