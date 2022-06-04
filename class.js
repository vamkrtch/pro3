class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        // console.log(newCell, this.multiply);
        if (this.multiply >= 7 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;

        }
    }



}



class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }


    move() {


        var newCell = random(this.chooseCell(0))

        if (newCell) {
            this.energy--;
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = this.index;

            this.x = x;
            this.y = y;



        }
    }

    eat() {
        var grassCells = random(this.chooseCell(1))
        if (grassCells) {
            // var x = grassCells[0];
            // var y = grassCells[1];
            matrix[this.y][this.x] = 0;
            matrix[grassCells[1]][grassCells[0]] = this.index;

            this.x = grassCells[0];
            this.y = grassCells[1];

            for (var i in grassArr) {
                if (grassCells[0] == grassArr[i].x && grassCells[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);

                    break;
                }
            }
            this.energy += 2;
        }
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var x = newCell[0];
            var y = newCell[1];


            var newGrasseat = new GrassEater(x, y, this.index);
            grassEatArr.push(newGrasseat);
            matrix[y][x] = this.index;
            this.energy = 8
            if (this.multiply == 15) {

                for (var i in grassEatArr) {
                    if (grassEatArr[i].y == this.y && grassEatArr[i].x == this.x) {
                        grassEatArr.splice(i, 1);
                        break;


                    }
                }
            }
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in grassEatArr) {
                if (grassEatArr[i].y == this.y && grassEatArr[i].x == this.x) {
                    grassEatArr.splice(i, 1);
                    break;


                }
            }
        }
    }
}
class Animal {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.x + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }


    move() {


        var newCell = random(this.chooseCell(0))

        if (newCell) {
            this.energy--;

            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = this.index;

            this.x = x;
            this.y = y;



        }
    }

    eat() {
        var grassEatCells = random(this.chooseCell(2))
        if (grassEatCells) {
            var x = grassEatCells[0];
            var y = grassEatCells[1];

            matrix[this.y][this.x] = 0;
            matrix[y][x] = this.index;



            for (var i in grassEatArr) {
                if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }

            this.x = x;
            this.y = y;
            this.energy += 3;
        }
    }

    mul() {
        // this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var x = newCell[0];
            var y = newCell[1];


            var newAnimal = new Animal(x, y, this.index);
            AnimalArr.push(newAnimal);
            matrix[y][x] = this.index;
            this.energy = 8

        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in AnimalArr) {
                if (AnimalArr[i].y == this.y && AnimalArr[i].x == this.x) {
                    AnimalArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Hunter {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 3, this.y + 3],
            [this.x - 1, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x - 3, this.y - 3],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 3, this.y + 3],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 3, this.y + 3]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }


    move() {

        var AllnewCell = [];
        var newCell = random(this.chooseCell(1));
        var newCell2 = random(this.chooseCell(0));
        AllnewCell.push(newCell);
        AllnewCell.push(newCell2);
        var randcell = random(AllnewCell)
        if (randcell) {


            var x = randcell[0];
            var y = randcell[1];


            matrix[this.y][this.x] = 0;

            matrix[y][x] = this.index;

            this.x = x;
            this.y = y;

            this.energy--;

        }
    }
    eat() {
        var AnimalCells = random(this.chooseCell(3));
        if (AnimalCells) {
            var x = AnimalCells[0];
            var y = AnimalCells[1];

            matrix[this.y][this.x] = 0;
            matrix[y][x] = this.index;



            for (var i in AnimalArr) {
                if (x == AnimalArr[i].x && y == AnimalArr[i].y) {
                    AnimalArr.splice(i, 1);
                    break;
                }
            }

            this.x = x;
            this.y = y;
            this.energy += 2;
        }
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var x = newCell[0];
            var y = newCell[1];


            var newHunter = new Hunter(x, y, this.index);
            hunterArr.push(newHunter);
            matrix[y][x] = this.index;
            this.energy = 8
            this.multiply++;

        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in hunterArr) {
                if (hunterArr[i].y == this.y && hunterArr[i].x == this.x) {
                    hunterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (this.multiply == 10) {
            for (var i in hunterArr) {
                if (hunterArr[i].y == this.y && hunterArr[i].x == this.x) {
                    hunterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


class Forestman {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x + 3, this.y],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 3, this.y]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }


    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            console.log(newCell)
            var x = newCell[0];
            var y = newCell[1];

            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
        }
    }


    eat() {
        var HunterCells = random(this.chooseCell(4));

        var grassEatCells = random(this.chooseCell(3));
        var AllCells = HunterCells + grassEatCells
        var rand = random(AllCells)
        if (rand) {
            var x = rand[0];
            var y = rand[1];

            matrix[this.y][this.x] = 0;
            matrix[y][x] = this.index;


            if (matrix[y][x] == 4) {
                for (var i in hunterArr) {
                    if (x == hunterArr[i].x && y == hunterArr[i].y) {
                        hunterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                for (var i in grassEatArr) {
                    if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
                        grassatArr.splice(i, 1);
                        break;
                    }
                }
            }
            this.x = x;
            this.y = y;
            this.energy += 2;
        }
    }

    mul() {
        // this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 14 && newCell) {
            var x = newCell[0];
            var y = newCell[1];


            var newforestman = new Forestman(x, y, this.index);
            ForestmanArr.push(newforestman);
            matrix[y][x] = this.index;
            this.energy = 8

        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in ForestmanArr) {
                if (ForestmanArr[i].y == this.y && ForestmanArr[i].x == this.x) {
                    ForestmanArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


