class Robot {
    constructor() {
        this.position = new Coordonnee(0, 0);
        // tableau en deux dimensions représentant la grille à nettoyer
        this.historiquePosition = [];
        this.AjouterPositionHistorique(this.position);
        this.avancer = true;
    }

    GetPosition() {
        return this.position;
    }

    SetPosition(x, y) {
        this.position.SetX(x);
        this.position.SetY(y);
    }

    DeterminerDirection(anciennePosition, nouvellePosition) {
        if (anciennePosition.GetY() === nouvellePosition.GetY()) {
            if (anciennePosition.GetX() < nouvellePosition.GetX()) {
                return "la droite";
            }
            else {
                return "la gauche";
            }
        }
        else {
            return "le bas";
        }
    }

    AfficherDeplacement() {
        const anciennePosition = this.historiquePosition[this.historiquePosition.length - 2];
        const nouvellePosition = this.historiquePosition[this.historiquePosition.length -1];

        const direction = this.DeterminerDirection(anciennePosition, nouvellePosition);

        console.log(`Le robot se déplace vers ${direction} de la case [${anciennePosition.GetX()}, ${anciennePosition.GetY()}] vers la case [${nouvellePosition.GetX()}, ${nouvellePosition.GetY()}].`);
    }

    // Appelée par la fonction logique métier
    // Déplace le robot de gauche à droite et bas en haut ;
    // Enregistre la nouvelle position dans l'historique des positions
    SeDeplacer(oGrille) {
        const largeurMax = oGrille.GetLargeur() - 1;
        const hauteurMax = oGrille.GetHauteur() - 1;

        // Bout de la grille atteint
        if (this.position.GetX() === largeurMax && this.position.GetY() === hauteurMax) {
            return;
        }

        // premier déplacement, robot en (0,0)
        if (this.historiquePosition.length === 1) {
            this.SetPosition(this.position.GetX() + 1, this.position.GetY());
        }
        else {
            const dernierePosition = this.historiquePosition[this.historiquePosition.length - 2];

            // Le robot arrive en bout de ligne parcourue
            if ((this.position.GetX() === largeurMax || this.position.GetX() === 0)
                && dernierePosition.GetY() === this.position.GetY()) {
                    // Le robot se déplace vers le bas
                    this.SetPosition(this.position.GetX(), this.position.GetY() + 1);
                    // Inverse la direction de déplacement
                    this.avancer = !this.avancer;
            }
            else {
                if (this.avancer) {
                    // le robot se déplace vers la droite
                    this.SetPosition(this.position.GetX() + 1, this.position.GetY());
                }
                else {
                    // le robot se déplace vers la gauche
                    this.SetPosition(this.position.GetX() - 1, this.position.GetY());
                }
            }
        }

        this.AjouterPositionHistorique();
        this.AfficherDeplacement();
    }

    AjouterPositionHistorique() {
        // deep copy avec l'opérateur spread (no ref copy)
        const currentPos = new Coordonnee(this.position.GetX(), this.position.GetY());
        this.historiquePosition.push(currentPos);
    }

    // Appelée par la fonction logique métier
    Nettoyer(oGrille) {
        // envoie la position à nettoyer à la grille
        oGrille.UpdateGrille(this.position.GetX(), this.position.GetY());
        console.log(`La position actuelle [${this.position.GetX()}, ${this.position.GetY()}] est propre.`);
    }
}

const Coordonnee = require("./coordonnee.js");
module.exports = Robot;