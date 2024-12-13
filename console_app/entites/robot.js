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

    displayPosition() {
        console.log(`Position du robot : x = ${this.position.getX()}, y = ${this.position.getY()}`);
    }

    displayDeplacement(direction) {
        console.log(`Déplacement vers ${direction} :`);
        this.displayPosition();
    }

    // Appelée par la fonction logique métier
    // Déplace le robot de gauche à droite et bas en haut ;
    // Enregistre la nouvelle position dans l'historique des positions
    move(oGrille) {
        const dernierePosition = this.historiquePosition[this.historiquePosition.length - 2];

        // Si le robot n'est pas en bout de ligne
        if (this.position.getX() < (oGrille.getWidth() - 1) && this.position.getX() > 0) {
            // Si le robot vient de la gauche
            if (dernierePosition.getX() < this.position.getX()) {
                // le robot se déplace vers la droite
                this.setPosition(this.position.getX() + 1, this.position.getY());
                this.displayDeplacement("la droite");
            }
            else {
                // le robot se déplace vers la gauche
                this.setPosition(this.position.getX() - 1, this.position.getY());
                this.displayDeplacement("la gauche");
            }
        }
        // Le robot est en bout de ligne
        else {
            if (this.position.getY() < (oGrille.getHeight() - 1)) {
                // Le robot se déplace vers le bas
                this.setPosition(this.position.getX(), this.position.getY() + 1);
                this.displayDeplacement("le bas");
            }
        }

        this.addPositionToHistoric();
    }

    addPositionToHistoric() {
        // deep copy avec l'opérateur spread (no ref copy)
        const currentPos = Object.assign({}, this.position);
        this.positionHistoric.push(currentPos);
    }

    // Appelée par la fonction logique métier
    clean(oGrille) {
        // envoie la position à nettoyer à la grille
        oGrille.updateGrid(this.position);
        console.log(`La position actuelle (${this.position.getX()}, ${this.position.getY()}) est propre.`);
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