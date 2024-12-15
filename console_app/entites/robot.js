class Robot {
    constructor() {
        this.position = new Coordonnee(0, 0);
        // tableau en deux dimensions représentant la grille à nettoyer
        this.historiquePosition = [];
        this.AjouterPositionHistorique(this.position);
        this.avancer = true;
        this.objectif = { x : null, y : null };
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
    // Déplace le robot de gauche à droite et bas en haut
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

    SeDeplacerIntelligemment(casesSales) {
        if (this.objectif.x === this.position.GetX()
            && this.objectif.y === this.position.GetY()) {
                this.objectif.x = null;
                this.objectif.y == null;
        }

        // Calculer la distance la plus courte vers un point sale depuis la position actuelle du robot :
        if (this.objectif.x === null || (this.objectif.x === 0 || this.objectif.y === 0)) {
            let nbCasesPlusCourtTrajet;

            casesSales.forEach(c => {
                const chemin = (Math.abs(this.position.GetY() - c.GetY())) + (Math.abs(this.position.GetX() - c.GetX()));

                if (nbCasesPlusCourtTrajet === undefined || nbCasesPlusCourtTrajet > chemin) {
                    nbCasesPlusCourtTrajet = chemin;
                    // nb de déplacement sur l'axe horizontal : négatif si la case sale est à gauche du robot
                    this.objectif.x = c.GetX() - this.position.GetX();
                    // nb de déplacement sur l'axe vertical : négatif si la case sale est au-dessus du robot
                    this.objectif.y = c.GetY() - this.position.GetY();
                }
            });
        }

        // On commence par se déplacer sur l'axe X.
        // Une fois ces déplacements épuisés, on se déplace sur l'axe Y.
        if (this.objectif.x < 0) {
            // déplacement vers la gauche
            this.SetPosition(this.position.GetX() - 1, this.position.GetY());
            this.objectif.x++;
        }
        else if (this.objectif.x > 0) {
            // déplacement vers la droite
            this.SetPosition(this.position.GetX() + 1, this.position.GetY());
            this.objectif.x--;
        }
        else if (this.objectif.y < 0) {
            // déplacement vers le haut
            this.SetPosition(this.position.GetX(), this.position.GetY() - 1);
            this.objectif.y++;
        }
        else if (this.objectif.y > 0) {
            // déplacement vers le bas
            this.SetPosition(this.position.GetX(), this.position.GetY() + 1);
            this.objectif.y--;
        }

        this.AjouterPositionHistorique();
        this.AfficherDeplacement();
    }

    AjouterPositionHistorique() {
        const currentPos = new Coordonnee(this.position.GetX(), this.position.GetY());
        this.historiquePosition.push(currentPos);
    }

    // Appelée par la fonction logique métier
    Nettoyer(oGrille) {
        // envoie la position à nettoyer à la grille
        oGrille.UpdateGrille(this.position.GetX(), this.position.GetY());
        console.log(`La position actuelle [${this.position.GetX()}, ${this.position.GetY()}] a été nettoyée.`);
    }
}

const Coordonnee = require("./coordonnee.js");
module.exports = Robot;