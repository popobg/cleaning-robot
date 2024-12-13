class Grille {
    constructor(largeur = 5, hauteur = 5, poussiere = 25) {
        this.largeur = largeur; 
        this.hauteur = hauteur; 
        this.pourcentagepoussiere = this.pourcentagepoussiere;
        this.CreateGrid=this.CreateGrid;
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
    getheight() {
        return this.largeur;
    }
    getwidth() {
        return this.hauteur;
    }

    setheight(largeur) {
        this.x = largeur;
    }

    setwidth(hauteur) {
        this.hauteur = hauteur;
    }
}