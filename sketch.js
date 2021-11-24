const shapes = {
    i:{
        color: color('cyan'),
        shape: [0x0F00, 0x4444, 0x00F0, 0x4444]
    },
    l:{
        color:color('orange'),
        shape: [0x4460, 0x0E80, 0xC440, 0x2E00]
    },
    j:{
        color:color('blue'),
        shape: [0x44C0, 0x8E00, 0x6440, 0x0E20]
    },
    t:{
        color:color('purple'),
        shape: [0x0E40, 0x4C40, 0x4E00, 0x4640]
    },
    s:{
        color:color('green'),
        shape: [0x8C40, 0x8C40, 0x6C00, 0x4620]
    },
    z:{
        color:color('red'),
        shape: [0x0C60, 0x4C80, 0xC600, 0x2640]
    },
    o:{
        color:color('yellow'),
        shape: [0xCC00, 0xCC00, 0xCC00, 0xCC00]
    },
    ".": {
      shapes: [0x8000],
      color: 'white'
    }
  };
  class Tetromino {
    constructor(id, parentField) {
      if (["i", "j", "l", "o", "s", "t", "z", "."].indexOf(id.toLowerCase()) < 0) {
        console.error("Error!");
        return;
      }
  
      this.parentField = parentField;
      this.shapeId = id.toLowerCase();
      this.block = shapes[this.shapeId];
      this.blockIndex = floor(random(this.block.shape.length));
      this.color = shapes[this.shapeId].color;
  
      this.pos = {
        x: 4,
        //x: (this.parentField.dimX)/2,
        y: 2,
      };
    }
    
  
  draw() {
    this.updateShape();
  
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
  
        if (this.shape[y] && this.shape[y][x]) {
          fill(this.color);
        } else {
          noFill();
        }
  
        rect((this.pos.x + x) * widthRatio, (this.pos.y + y) * heightRatio, widthRatio, heightRatio);
      }
    }
  }
 /*  split() {
    let splitted = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.shape[y] && this.shape[y][x]) {
          let t = new Tetromino(".", this.parentField);
          t.color = this.color;
          t.pos.x = this.pos.x + x;
          t.pos.y = this.pos.y + y;
  
          splitted.push(t);
        }
      }
    }
  
    return splitted;
  } */
   rotate() {
    this.blockIndex= (this.blockIndex+1)%4; 
    this.updateShape();
    /* let temp = this.clone();
    temp.blockIndex = (temp.blockIndex + 1) % (temp.block.shapes.length);
    temp.updateShape();
  
    if (this.parentField.moveClear(temp)) {
      this.blockIndex = (this.blockIndex + 1) % (this.block.shapes.length);
    } */
  }
  updateShape() {
    this.shape = (this.block.shape[this.blockIndex]).toString(16).padStart(4, '0').split('').map(row => parseInt(row, 16).toString(2).padStart(4, '0').split('').map(num => parseInt(num)));
    /* let test = (this.block.shape[this.blockIndex]).toString(16).padStart(4, '0').split('').map(row => parseInt(row, 16).toString(2).padStart(4, '0').split('').map(num => parseInt(num)));
    console.log(test); */
  }
  move(dir){
   
    /* for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
    while(this.pos.x+x<dimX && this.pos.y+y<dimY){
      
      if(dir==="right")
      this.pos.x +=1;
      if(dir==="left")
      this.pos.x -=1;
      if(dir==="down")
      this.pos.y +=0.5;
      else break;

    }
  }
} */
  }
}
class Board {
    constructor(dimX, dimY) {
      this.dimX = dimX;
      this.dimY = dimY;
      this.activeTet = this.newTetromino();
      this.tetrominos = [];
      this.score = 0;
      this.gameOver = false;
    }
   /*  animate() {
      if (this.gameOver) return false;
      if (!this.activeTet.move()) {
        this.tetrominos.push(...this.activeTet.split());
        this.activeTet = this.newTetromino();
        this.activeTet.updateShape();
        if (!this.moveClear(this.activeTet)) {
          this.activeTet = null;
          this.gameOver = true;
        }
        let i = dimY;
        while (this.checkRow() && i >= 0) i--;
      }
    } */
  
    draw() {
        noFill();
        strokeWeight(0.5);
        stroke(255);
    
        for (let x = 0; x < this.dimX; x++) {
          for (let y = 0; y < this.dimY; y++) {
            rect(x * widthRatio, y * heightRatio, widthRatio, heightRatio);
          }
        }
    
        if (this.activeTet) this.activeTet.draw();
        for (let tet of this.tetrominos) {
          tet.draw();
        }
      }
    
      newTetromino() {
         return new Tetromino(random(["i", "j", "l", "o", "s", "t", "z"]), this);
        //return new Tetromino("z", this);
        //t.rotate();
        // t.draw();
    
      }
      isCollide(){
        for (let x = 0; x < 4; x++) {
          for (let y = 0; y < 4; y++) {
            if (this.activeTet.shape && this.activeTet.shape[y] && this.activeTet.shape[y][x]) {
              if (this.activeTet.pos.y + y >= dimY) return false;
              if (this.activeTet.pos.x + x < 0) return false;
              if (this.activeTet.pos.x + x >= dimX) return false;
            }
          }
        }
      }
    }
let tablero;
const dimX = 20;
const dimY = 20;
let widthRatio;
let heightRatio;
let interval;  
function setup() {
  createCanvas(windowWidth/3, windowHeight);
    widthRatio = width / dimX;
    heightRatio = height / dimY;
    tablero = new Board(dimX,dimY);
    /* interval = setInterval(() => {
     if (!tablero.gameOver)
      tablero.animate()
    }, 2000); */
  }

  function draw() {
    background(66);
    tablero.draw();
    
  }
  function keyPressed() {
    if (keyCode === UP_ARROW) {
      tablero.activeTet.rotate();
    }
    else if (keyCode === RIGHT_ARROW){
      tablero.activeTet.move("right");
    }
    else if (keyCode === LEFT_ARROW){
      tablero.activeTet.move("left");
    }
    else if (keyCode === DOWN_ARROW){
      tablero.activeTet.move("down");
    }
    switch (keyCode) {
      /* case "ArrowRight":
        tablero.activeTet.move("right");
        break;
      case "ArrowLeft":
        tablero.activeTet.move("left");
        break; */
      case "P":
        tablero.activeTet.rotate();
        break;
      case "ArrowDown":
        tablero.activeTet.rotate();
        break;
      default:
        break;
    }
  }