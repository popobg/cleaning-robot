class Coordonnee {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    GetX() {
        return this.x;
    }

    GetY() {
        return this.y;
    }

    SetX(newX) {
        this.x = newX;
    }

    SetY(newY) {
        this.y = newY;
    }
}

module.exports = Coordonnee;