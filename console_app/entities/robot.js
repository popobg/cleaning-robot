class Robot {
    constructor(tauxEnergie = 20, tauxCharge = 100, base = new Coordonnee(0, 0)) {
        // position du départ du robot : sa base de recharge
        this.position = new Coordonnee(base.GetX(), base.GetY());
        this.historiquePosition = [];
        this.AjouterPositionHistorique(this.position);
        this.objectif = { x : 0, y : 0 };
        this.batterie = tauxEnergie;
        this.base = base;
        this.tauxCharge = tauxCharge;
        this.impossible = false;
        this.premierTour = true;
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

    CalculerDistance(x, y, posX, posY) {
        return (Math.abs(posY - y) + Math.abs(posX - x));
    }

    SeDeplacer(casesSales) {
        // Recharge du robot
        if ((this.position.GetX() === this.base.GetX() && this.position.GetY() === this.base.GetY())
            && !this.premierTour ) {
            this.batterie = this.tauxCharge;
            console.log(`Batterie chargée à ${this.tauxCharge}% !`);
        }

        // Calculer la distance la plus courte vers un point sale depuis la position actuelle du robot :
        if (this.objectif.x === 0 && this.objectif.y === 0) {
            let nbCasesPlusCourtTrajet;

            casesSales.forEach(c => {
                const chemin = this.CalculerDistance(c.GetX(), c.GetY(), this.position.GetX(), this.position.GetY());

                if (nbCasesPlusCourtTrajet === undefined || nbCasesPlusCourtTrajet > chemin) {
                    nbCasesPlusCourtTrajet = chemin;
                    // nb de déplacement sur l'axe horizontal : négatif si la case sale est à gauche du robot
                    this.objectif.x = c.GetX() - this.position.GetX();
                    // nb de déplacement sur l'axe vertical : négatif si la case sale est au-dessus du robot
                    this.objectif.y = c.GetY() - this.position.GetY();
                }
            });

            // Le robot aura-t-il assez de batterie pour aller à l'objectif puis revenir à  sa base ?
            const trajet = Math.abs(this.objectif.x + this.objectif.y);
            const retour = this.CalculerDistance(this.base.GetX(), this.base.GetY(), this.position.GetX() + this.objectif.x, this.position.GetY() + this.objectif.y);
            const somme = trajet + retour;

            if (this.CalculerDistance(this.base.GetX(), this.base.GetY(), this.objectif.x, this.objectif.y) * 2 >= this.tauxCharge) {
                console.log("Tâches restantes impossibles à atteindre avec le taux de charge donné.");
                this.impossible = true;
                return;
            }

            // -1 pour la perte de batterie due au nettoyage
            if ((this.batterie - 1) - somme <= 0) {
                console.log("Le robot a besoin d'être rechargé.");
                this.objectif.x = this.base.GetX() - this.position.GetX();
                this.objectif.y = this.base.GetY() - this.position.GetY();
            }
        }

        // Recharge dès le premier tour --> pas de déplacement
        if (this.objectif.x === this.base.GetX() && this.objectif.y === this.base.GetY() && this.premierTour) {
            console.log("Pas de déplacement à ce tour.");
            this.premierTour = false;
            return;
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

        // Perte de 1% à chaque déplacement
        this.batterie--;
        console.log(`Batterie du robot : ${this.batterie}%.`);

        this.premierTour = false;
    }

    AjouterPositionHistorique() {
        const currentPos = new Coordonnee(this.position.GetX(), this.position.GetY());
        this.historiquePosition.push(currentPos);
    }

    // Appelée par la fonction logique métier
    Nettoyer(oGrille) {
        // envoie la position à nettoyer à la grille
        oGrille.UpdateGrille(this.position.GetX(), this.position.GetY());

        // Si plus de tâches --> retour à la base
        if (oGrille.casesSales.length === 0) {
            oGrille.casesSales.push(new Coordonnee(0, 0));
        }

        console.log(`La position actuelle [${this.position.GetX()}, ${this.position.GetY()}] a été nettoyée.`);
        // Perte de 1% d'énergie au nettoyage
        this.batterie--;
    }
}

const Coordonnee = require("./coordonnee.js");
module.exports = Robot;