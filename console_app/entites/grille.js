class Grille {
    constructor(largeur = 5, hauteur = 5, pourcentagepoussiere = 25) {
        this.largeur = largeur; 
        this.hauteur = hauteur; 
        this.pourcentagepoussiere = pourcentagepoussiere;
        this.CreateGrid = this.CreateGrid;
    }
    CreateGrid()  { 
        let grille = [];
        for (let y = 0; y < this.hauteur; y++)  { 
            const ligne = [];
            for (let x = 0; x < this.largeur; x++)  
            {
                ligne.push(Math.random() < this.pourcentagepoussiere / 100 ? " " : "X");
             }
             grille.push(ligne);
        }
        return grille;
    }
    UpdateGrid(x, y){ 
        if (this.grille?.[y]?.[x] === " ") { 
            this.grille[y][x] = "X";
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