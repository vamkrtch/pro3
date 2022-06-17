var socket = io("ws://localhost:4001");

// var matrix = [];
// var n = 50;
// var m = 50;

var side = 10;
// io.sockets.on("the data",fn);

function fn(data) {
  matrix = data.matrix;
  return matrix;
}

function setup() {
  // frameRate(5);
  createCanvas(55 * side, 55 * side);
  background("#acacac");
}

function nkarel(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        fill("green");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 1) {
        fill("#acacac");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 2) {
        fill("yellow");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 3) {
        fill("red");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 4) {
        fill("blue");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 5) {
        fill("black");
        rect(x * side, y * side, side, side);
      }
    }
  }
}

// socket.on("send matrix", nkarel);
socket.on("send matrix", (data) => {
  console.log("Send Matrix: ", data);
  nkarel(data.matrix);
});
