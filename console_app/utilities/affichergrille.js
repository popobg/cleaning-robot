class AfficherGrille {
    constructor(grille) {
        let grille = this.grille;
    }
    afficher(grille, rx,ry)  
    {
        console.clear();
        this.grille.forEach((ligne, y) => {
        const ligneAffichee = ligne.map((caseGrille, x) =>
        x === rx && y === ry ? "R" : caseGrille
            );
        console.log("|" + ligneAffichee.join("|") + "|");
        });
    }
 
 
}
                
 