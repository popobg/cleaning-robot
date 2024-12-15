class Grille {
    constructor(largeur = 5, hauteur = 5, pourcentagePoussiere = 25) {
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.pourcentagePoussiere = pourcentagePoussiere;
        this.casesSales = this.GenerateCasesSales();
    }

    GenerateCasesSales() {
        const nbCasesSales = Math.floor((this.largeur * this.hauteur) * this.pourcentagePoussiere / 100);

        const casesSales = [];
        while (casesSales.length < nbCasesSales) {
            const x = Math.floor(Math.random() * this.largeur);
            const y = Math.floor(Math.random() * this.hauteur);
            const caseSale = new Coordonnee(x, y);

            if (!casesSales.some(c => c.GetX() === x && c.GetY() === y)) {
                casesSales.push(caseSale);
            }
        }

        return casesSales;
    }

    // Fait gagner du temps à la méthode isDirty
    sortCases(cases) {
        cases.sort((a, b) => {
            if (a.y === b.y) {
                // tri par ordre croissant selon X
                return a.x - b.x;
            }
            // tri par ordre croissant selon Y
            return a.y - b.y;
        });

        return cases;
    }

    UpdateGrille(x, y) {
        this.casesSales = this.casesSales.filter(c => !(c.GetX() === x && c.GetY() === y));
    }

    isDirty(x, y) {
        return this.casesSales.some(c => c.GetX() === x && c.GetY() === y);
    }

    GetLargeur() {
        return this.largeur;
    }

    GetHauteur() {
        return this.hauteur;
    }

    GetCasesSales() {
        return this.casesSales;
    }
}

const Coordonnee = require("./coordonnee.js");
module.exports = Grille;