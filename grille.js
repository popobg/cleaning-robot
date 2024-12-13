class Grille {
    constructor(largeur = 5, hauteur = 5, pourcentagepoussiere = 25) {
        this.largeur = largeur; 
        this.hauteur = hauteur; 
        this.pourcentagepoussiere = this.pourcentagepoussiere;
        this.CreateGrid=this.CreateGrid;
    }
    CreateGrid()  { 
        let oGrille = [];
        for (let y = 0; y < this.hauteur; y++)  { 
            const ligne = [];
            for (let x = 0; x < this.largeur; x++)  
            {
                ligne.push(Math.random() < this.pourcentagepoussiere / 100 ? " " : "X");
             }
             oGrille.push(ligne);
        }
        return oGrille;
    }
    UpdateGrid(x, y){ 
        if (this.oGrille?.[y]?.[x] === " ") { 
            this.oGrille[y][x] = "X";
        }
    }
    getlargeur() {
        return this.largeur;
    }
    gethauteur() {
        return this.hauteur;
    }

    setlargeur(largeur) {
        this.x = largeur;
    }

    sethauteur(hauteur) {
        this.hauteur = hauteur;
    }
}
const grille = new Grille(largeur, hauteur, poussiere);