const oGrille = new Grille();
oGrille.createGrid();
const robot = new Robot(grid);
// [["X", "X", "X", "X", " ", " ", "X"], [" ", "X", "X", ...], ...]
let coordonnees_robot = Robot.getPosition();

// pour le moment check si le robot a parcouru toute la grille
while(coordonnees_robot.getX() === (grid.largeur -1) && coordonnees_robot.getY() === (grid.hauteur - 1)) {
    coordonnees_robot = Robot.getPosition();

    // Met fin au programme
    if () {
        console.log("La grille est nettoyée intégralement !");
        return;
    }

    for(let y = 0; y) {
        for(let x =0;) {
            if () {// le cas où c'est les coordonnées du robot
                // display R
                if (grid[y][x] === " ") {
                    // grid = robot.clean(oGrille);
                }
            }
            else {
                // display X / " "
            }
        }
    }
}

console.log("La grille est nettoyée intégralement !");