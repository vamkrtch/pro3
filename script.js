


// var matrix = [
//     [0, 0, 1, 0, 3],
//     [1, 4, 0, 0, 0],
//     [0, 2, 5, 2, 2],
//     [0, 3, 1, 0, 3],
//     [1, 1, 0, 4, 0],
//     [1, 1, 0, 0, 0],
//     [1, 1, 5, 3, 0]
// ];
var matrix = [];
var n = 50
var m = 50


var side = 10;

var grassArr = [];
var grassEatArr = [];
var AnimalArr = [];
var hunterArr = [];
var ForestmanArr = [];

function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            matrix[y][x] = Math.round(random(0, 5))
        }

    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y, 2);
                grassEatArr.push(grEat);
            }
            else if (matrix[y][x] == 3) {
                var An = new Animal(x, y, 3);
                AnimalArr.push(An);
            }
            else if (matrix[y][x] == 4) {
                var huntArr = new Hunter(x, y, 4);
                hunterArr.push(huntArr);
            }
            else if (matrix[y][x] == 5) {
                var ForestArr = new Forestman(x, y, 5);
                ForestmanArr.push(ForestArr);
            }
        }
    }

}






function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);

            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);

            }
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEatArr) {
        grassEatArr[i].move();
        grassEatArr[i].eat();
        grassEatArr[i].mul();
        grassEatArr[i].die();
    }
    for (var i in AnimalArr) {
        AnimalArr[i].move();
        AnimalArr[i].eat();
        AnimalArr[i].mul();
        AnimalArr[i].die();
    }
    for (var i in hunterArr) {
        hunterArr[i].move();
        hunterArr[i].eat();
        hunterArr[i].mul();
        hunterArr[i].die();
    }
    for (var i in ForestmanArr) {
        ForestmanArr[i].move();
        ForestmanArr[i].eat();
        ForestmanArr[i].mul();
        ForestmanArr[i].die();
    }
}
