class Grille {
    constructor(largeur = 5, hauteur = 5, pourcentagepoussiere = 25) {
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.pourcentagepoussiere = pourcentagepoussiere;
        this.grille = this.CreateGrille();
    }

    CreateGrille() {
        let grille = [];
        for (let y = 0; y < this.hauteur; y++) {
            const ligne = [];

            for (let x = 0; x < this.largeur; x++)
            {
                // " " = case sale, "X" = case propre
                // la case a un pourcentage de chance donné d'être sale
                ligne.push(Math.random() < this.pourcentagepoussiere / 100 ? " " : "X");
             }

            grille.push(ligne);
        }

        return grille;
    }

    UpdateGrille(x, y) {
        if (this.grille?.[y]?.[x] === " ") {
            this.grille[y][x] = "X";
        }
    }

    isDirty(x, y) {
        if (this.grille?.[y]?.[x] === " ") {
            return true;
        }
    }

    GetLargeur() {
        return this.largeur;
    }

    GetHauteur() {
        return this.hauteur;
    }

    SetLargeur(largeur) {
        this.largeur = largeur;
    }

    SetHauteur(hauteur) {
        this.hauteur = hauteur;
    }
}
// Optimisation : avoir juste un tableau avec les coordonnées des cases sales ==> plus de grille

module.exports = Grille;