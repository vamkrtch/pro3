const Grass = require("./Grass");
const GrassEater = require("./GrassEater");
const Animal = require("./Animal");
const Hunter = require("./Hunter");

class Forestman extends GrassEater {
  constructor(x, y, index) {
    super(x, y, index);
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
      [this.x - 3, this.y],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }

  move() {
    var newCell = random(this.chooseCell(0));
    if (newCell) {
      console.log(newCell);
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
    var AllCells = HunterCells + grassEatCells;
    var rand = random(AllCells);
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
      } else {
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
      this.energy = 8;
    }
  }

  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;

      for (var i in ForestmanArr) {
        if (ForestmanArr[i].y == this.y && ForestmanArr[i].x == this.x) {
          ForestmanArr.splice(i, 1);
          break;
        }
      }
    }
  }
}
