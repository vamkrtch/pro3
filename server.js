var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");
const { start } = require("repl");

Grass = require("./Grass");
GrassEater = require("./GrassEater");
Animal = require("./Animal");
Hunter = require("./Hunter");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
server.listen(4001);

grassArr = [];
grassEatArr = [];
AnimalArr = [];
hunterArr = [];
ForestmanArr = [];
Grass = require("./Grass");
GrassEater = require("./GrassEater");

// var matrix = [
//     [0, 0, 1, 0, 3],
//     [1, 4, 0, 0, 0],
//     [0, 2, 5, 2, 2],
//     [0, 3, 1, 0, 3],
//     [1, 1, 0, 4, 0],
//     [1, 1, 0, 0, 0],
//     [1, 1, 5, 3, 0]
// ];

var n = 50;
var m = 50;
function gen() {
  var matrix = [];
  for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
      matrix[y][x] = Math.floor(Math.random() * 5);
    }
  }
  return matrix;
}
matrix = gen();

data = {
  matrix: matrix,
};

function createObject() {
  const { matrix } = data;

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y, 1);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var grEat = new GrassEater(x, y, 2);
        grassEatArr.push(grEat);
      } else if (matrix[y][x] == 3) {
        var An = new Animal(x, y, 3);
        AnimalArr.push(An);
      } else if (matrix[y][x] == 4) {
        var huntArr = new Hunter(x, y, 4);
        hunterArr.push(huntArr);
      } else if (matrix[y][x] == 5) {
        var ForestArr = new Forestman(x, y, 5);
        ForestmanArr.push(ForestArr);
      }
    }
  }
}

function game() {
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

setInterval(() => {
  io.sockets.emit("send matrix", data);
}, 1000);
