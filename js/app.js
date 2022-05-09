console.log("is this workin 👀")
const canvas = document.querySelector("#canvas")
const movementDisplay = document.querySelector("#score")
//Setting the dimensions of the canvas
const ctx = canvas.getContext("2d")


canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

const gameLoopInterval = setInterval(gameLoop, 60);

//setting an object that contains the player's info 
class Object {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
  }

  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const shopper = new Object(5, 330, "hotpink", 80, 80);
const donut = new Object(10, 5, "lightgreen", 32, 48);

function drawBox(x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h);
}

function movementHandler(e) {
const speed = 50
console.log(e.key)
  switch (e.key) {
    case('ArrowLeft'):
      shopper.x = shopper.x - speed
      break
    case ('ArrowRight'):
      shopper.x = shopper.x + speed
      break
  }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    shopper.render()
    donut.render()
}

canvas.addEventListener("click", (e) => {
  console.log(`x is ${e.offsetX} y is ${e.offsetY}`);
});

document.addEventListener('keydown', movementHandler)

function spawnSnack(){

}





















// class Food {
//   constructor(x, y, color, width, height) {
//     this.x = x;
//     this.y = y;
//     this.color = color;
//     this.width = width;
//     this.height = height;
//     this.alive = true;
//   }
//   render() {
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
// }

// const donut = new Food(300, 300, "yellow", 40, 40);
// const veggie = new Food(300, 300, "green", 40, 40);
// donut.render()
// veggie.render()

// function drawBox(x, y, w, h, color) {
//   ctx.fillStyle = color
//   ctx.fillRect(x, y, w, h);
// }