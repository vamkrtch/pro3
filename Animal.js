const Grass = require("./Grass");
const GrassEater = require("./GrassEater");
const Animal = require("./Animal");
const Hunter = require("./Hunter");

module.exports = class Animal extends GrassEater {
  constructor(x, y, index) {
    super(x, y, index);
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
      [this.x + 2, this.y + 2],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }
  move() {
    var newCell = random(this.chooseCell(0));

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
    var grassEatCells = random(this.chooseCell(2));
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
      this.energy = 8;
    }
  }

  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;

      for (var i in AnimalArr) {
        if (AnimalArr[i].y == this.y && AnimalArr[i].x == this.x) {
          AnimalArr.splice(i, 1);
          break;
        }
      }
    }
  }
};