class Robot {
    constructor() {
        this.position = new Coordonnee(0, 0);
        // tableau en deux dimensions représentant la grille à nettoyer
        this.historiquePosition = [new Coordonnee(0, 0)];
    }

    getPosition() {
        return this.position;
    }

    setPosition(x, y) {
        this.position.setX(x);
        this.position.setY(y);
    }

    getGrille() {
        return this.grille;
    }

    displayPosition() {
        console.log(`Position du robot : x = ${this.position.getX()}, y = ${this.position.getY()}`);
    }

    displayDeplacement(direction) {
        console.log(`Déplacement vers ${direction} :`);
        this.displayPosition();
    }

    move(grille) {
        // Déplace le robot de gauche à droite et bas en haut ;
        // Enregistre la nouvelle position dans l'historique des positions
        const dernierePosition = this.historiquePosition[this.historiquePosition.length - 1];

        // Si le robot n'est pas en bout de ligne
        if (this.position.getX() < (grille.largeur - 1) && this.position.getX() > 0) {
            // Si le robot vient de la gauche
            if (dernierePosition.getX() < this.position.getX()) {
                // le robot se déplace vers la droite
                this.position.setX(this.position.getX() + 1);
            }
            else {
                // le robot se déplace vers la gauche
                this.position.setX(this.position.getX() - 1);
            }
        }
        // Le robot est en bout de ligne
        else {
            if (this.position.getY() < (grille.hauteur - 1)) {
                // Le robot se déplace vers le bas
                this.position.setY(this.position.getY() + 1);
            }
        }

        this.ajoutPosition();
    }

    // Appelée par la fonction logique métier
    clean(grille) {
        // deep copy using the spread operator (no ref copy)
        const currentPos = Object.assign({}, this.position);
        this.positionHistoric.push(currentPos);

        console.log(`La position actuelle (${this.position.getX()}, ${this.position.getY()}) est propre.`);
        return grille;
    }

    displayPositionHistoric() {
        if (this.positionHistoric.length === 0) {
            console.log("Aucune déplacement effectué.");
        }
        else {
            console.log('Les positions parcourues sont : ');
            this.positionHistoric.forEach(p => console.log(`x = ${p.x}, y = ${p.y}.`));
        }
    }
}