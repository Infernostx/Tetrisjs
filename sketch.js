new p5();
const dimX = 10;
const dimY = 25;
const shapes = {
  i: {
    colors: color('cyan'),
    shape: [0x0F00, 0x4444, 0x00F0, 0x4444]
  },
  l: {
    colors: color('orange'),
    shape: [0x4460, 0x0E80, 0xC440, 0x2E00]
  },
  j: {
    colors: color('blue'),
    shape: [0x44C0, 0x8E00, 0x6440, 0x0E20]
  },
  t: {
    colors: color('purple'),
    shape: [0x0E40, 0x4C40, 0x4E00, 0x4640]
  },
  s: {
    colors: color('green'),
    shape: [0x8C40, 0x8C40, 0x6C00, 0x4620]
  },
  z: {
    colors: color('red'),
    shape: [0x0C60, 0x4C80, 0xC600, 0x2640]
  },
  o: {
    colors: color('yellow'),
    shape: [0xCC00, 0xCC00, 0xCC00, 0xCC00]
  },
  ".": {
    shapes: [0x8000],
    colors: 'white'
  }
};
  class  Tetromino {
    constructor(id, parentField) {
      if (["i", "j", "l", "o", "s", "t", "z", "."].indexOf(id.toLowerCase()) < 0) {
        console.error("Error!");
        return;
      }
  
      this.parentField = parentField;
      this.shapeId = id.toLowerCase();
      this.block = shapes[this.shapeId];
      this.blockIndex = floor(random(this.block.shape.length));
      
      this.color = shapes[this.shapeId].colors;
      
  
      this.pos = {
        //x: 4,
        x: (this.parentField.dimX)/2,
        y: 2,
      };
    }
    
  
  draw() {
    this.updateShape();
    //this.isCollide();
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
  
        if (this.shape[y][x]) {
          fill(this.color);
          stroke('white');
          strokeWeight(2);
        } else {
          noFill();
          noStroke();
        }
  
        rect((this.pos.x + x) * widthRatio, (this.pos.y + y) * heightRatio, widthRatio, heightRatio);
      }
    }
  }

colorChange() {
  if (colorPicker.color() === 'white' /* || this.parentField.isCollide() */) {
    this.color = shapes[this.shapeId].colors;
  }
  else { this.color = colorPicker.color(); }

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
  // Genera del numero hexadecimal, las distintas posiciones de las piezas que forman un tetromino en una matriz
  updateShape() {
    this.shape = (this.block.shape[this.blockIndex]).toString(16).padStart(4, '0').split('').map(row => parseInt(row, 16).toString(2).padStart(4, '0').split('').map(num => parseInt(num)));
    let test = (this.block.shape[this.blockIndex]).toString(16).padStart(4, '0').split('').map(row => parseInt(row, 16).toString(2).padStart(4, '0').split('').map(num => parseInt(num)));
    console.log(test);
    }
    move(dir) {
   if (this.parentField.isCollide()){
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
    
      
      if(dir==="right")
      this.pos.x +=2.5/dimX;
      if(dir==="left")
      this.pos.x -=2.5/dimX;
      if(dir==="down")
      this.pos.y +=4.68/dimY;
      else break;

      }
  }
}
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
       /*  for (let tet of this.tetrominos) {
          tet.draw();
        } */
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
              if (this.activeTet.pos.y +y >= dimY*0.8) return false;
              if (this.activeTet.pos.x +x < 0) return false;
              if (this.activeTet.pos.x +x >= dimX*0.9) return false;
              else return true;
            }
          }
        }
      }
    }
/* let tick={
  lv1: 2000,
  lv2: 1800,
  lv3: 1600,
  lv4: 1150,
  lv5: 1000
}; */
let tick = 2000;
let tablero;
let button;
let diffSlider;
let widthRatio;
let heightRatio;
let night;
let colorPicker;
//let interval;  
function setup() {
  //Canvas
  createCanvas(windowWidth/6, windowHeight*0.8);
    widthRatio = width / dimX;
    heightRatio = height / dimY;
    tablero = new Board(dimX,dimY);
  //Slider
  diffSlider = createSlider(1, 5, 1);
  diffSlider.position(width + 100, (height + 60) / 2);
  diffSlider.style('width', '50px');
  //Intervalo
  //tick = 7000 / diffSlider.value();
  interval = setInterval(() => {
    if (!tablero.gameOver)
      tablero.activeTet.move('down');
      //tablero.animate(),
  }, (tick / diffSlider.value()));
  //Boton reset
  button = createButton('Reset');
  button.position(width + 100, height/2);
  button.mousePressed(reset);
  //Checkbox night mode
  night = createCheckbox('Night mode?', false);
  night.changed(nightmode);
  night.position(width + 100, (height+100) / 2);
  colorPicker = createColorPicker('white');
  colorPicker.position(width + 100, (height + 200) / 2);
}

  function draw() {
    background(diffSlider.value()*50,55,255/diffSlider.value());
    tablero.draw();
    tablero.activeTet.colorChange();
    //colorChange(colorPicker.color);
    //tick = 2000 / diffSlider.value();
    
    
    
    
  }
 //todo add to board 
function reset() {
  tablero = null;
  tablero = new Board(dimX, dimY);

}
//Cambia la interfaz a nightmode
function nightmode(){
  switch(night.checked()){
    case true:
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      
    break;
    case false:
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      break;
    default:
      break;  
  }
}
/* function difficulty() {
  let dtick=tick;
  let diff=diffSlider.value();
  switch (diff){
    case 1:
      dtick = tick.lv1;
      break;
    case 2:
      dtick = tick.lv2;
      break;
    case 3:
      dtick = tick.lv3;
      break;
    case 4:
      dtick = tick.lv4;
      break;
    case 5:
      dtick = tick.lv5;
      break;
  } 
  return dtick;

}*/
//Controles
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
      case "ArrowRight":
        tablero.activeTet.move("right");
        break;
      case "ArrowLeft":
        tablero.activeTet.move("left");
        break;
      case 80:
        //tablero.activeTet = null;
        //tablero.newTetromino();
        //tablero.activeTet.rotate();
        tablero.activeTet.colorChange();
        break;
      case "ArrowDown":
        tablero.activeTet.rotate();
        break;
      default:
        break;
    }
  }