console.log("is this workin 👀")
const canvas = document.querySelector("#canvas")
const movementDisplay = document.querySelector("#score")

//Setting the dimensions of the canvas
const ctx = canvas.getContext("2d")


canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])


let score = 100

setInterval(gameLoop, 60);

let gameOver = false

//setting an object that contains the player's info 
class Object {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.active = true;
  }

  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const randomNum = Math.floor((Math.random()*700)+50)
const randomNum2 = Math.floor((Math.random()* 700) + 50)

const shopper = new Object(5, 360, "hotpink", 80, 80);
const donut = new Object(randomNum, 0, "lightpink", 32, 48);
const veggie = new Object(randomNum2, 0, "lightgreen", 32, 48);

function drawBox(x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h);
}

function movementHandler(e) {
const speed = 60
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
    if (donut.active) {
      donut.render()
    }
    if (veggie.active) {
      veggie.render();
    }
    detectHit()
    detectLoss()
    console.log(donut)
    console.log(veggie)
}

canvas.addEventListener("click", (e) => {
  console.log(`x is ${e.offsetX} y is ${e.offsetY}`);
});

document.addEventListener('keydown', movementHandler)

const gravity = .5
const drop = setInterval(function(){
    donut.y += gravity;
    veggie.y += gravity;
})



function detectHit() {
  if (
    shopper.x < donut.x + donut.width &&
    shopper.x + donut.width > donut.x &&
    shopper.y < donut.y + donut.height &&
    shopper.y + shopper.height > donut.y
  ) {
    if (donut.active === true){
      donut.active = false
      const collide = document.querySelector("#status1");
      collide.innerText = "Keep it up!"
      const updatedScore = document.querySelector("#score");
      score = score + 50
      updatedScore.innerText = score 
    
    }
  }
}
function detectLoss() {
  const updatedScore = document.querySelector("#score");

  if (
    shopper.x < veggie.x + veggie.width &&
    shopper.x + veggie.width > veggie.x &&
    shopper.y < veggie.y + veggie.height &&
    shopper.y + shopper.height > veggie.y
  ) {
    veggie.active = false
    const collide = document.querySelector("#status1");
    collide.innerText = "Hey! Emily wanted a donut!";
   
    score = score - 50
    updatedScore.innerText = score 
  } 

  if (score <= 0) {
      clearInterval()
    //  updatedScore.innerText = 0
  }
}

// const repeat = setInterval(gameLoop(), 1000)

// function spawnRandomObject() {
// if (randomNum < 500) {
//   setInterval
//   donut.render()
//  } else if (randomNum2 > 500) {
//    veggie.render()
//  }
// }



  


document.querySelector("#restart").addEventListener("click", function () {
  console.log("hey");
  location.reload();
})

