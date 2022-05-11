console.log("is this workin 👀");
const canvas = document.querySelector("#canvas");
const updatedScore = document.querySelector("#score");
const collide = document.querySelector("#status1");
document.addEventListener("keydown", movementHandler)

//Setting the dimensions of the canvas
const ctx = canvas.getContext("2d");

canvas.height = 444
canvas.width = 880

let score = 100;

setInterval(gameLoop, 60);

let gameOver = false;

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
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


function generateRandom(){
  let randomNumber = Math.floor(Math.random()*canvas.width - 30)
  return randomNumber
}

const shopper = new Object(5, 360, "hotpink", 80, 80);
const donut = new Object(generateRandom(), 0, "hotpink", 32, 48);
const veggie = new Object(generateRandom(), 0, "lightgreen", 32, 48);

function drawBox(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h)
}


const gravity = 5;
const drop = setInterval(function () {
  donut.y += gravity;
  veggie.y += gravity;
});

let donuts = []
let veggies = []

const donutSpawn = setInterval(function(){
  donuts.push( new Object(generateRandom(), 0, "hotpink", 32, 48))
}, 3000)

const veggieSpawn = setInterval(function () {
  veggies.push(new Object(generateRandom(), 0, "lightgreen", 32, 48));
}, 3000);


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  shopper.render()
  for(let i = 0; i < donuts.length; i++){
    donuts[i].render()
    donuts[i].y += gravity
    if (
      shopper.x < donuts[i].x + donuts[i].width &&
      shopper.x + donuts[i].width > donuts[i].x &&
      shopper.y < donuts[i].y + donuts[i].height &&
      shopper.y + shopper.height > donuts[i].y
    ) {
      if (donuts[i].active === true) {
        donuts[i].active = false;
        collide.innerText = "Keep it up!";
        donuts.splice(i, 1)
        updatedScore.innerText = score + 50
        score = score 
      }
    }
      for(let i = 0; i < veggies.length; i++){
    veggies[i].render()
    veggies[i].y += gravity
    if (
      shopper.x < veggies[i].x + veggies[i].width &&
      shopper.x + veggies[i].width > veggies[i].x &&
      shopper.y < veggies[i].y + veggies[i].height &&
      shopper.y + shopper.height > veggies[i].y
    ) {
      // if (veggies[i].active === true) {
      //   veggies[i].active = false;
      //   collide.innerText = "NOOO! Em wanted that donut";
       console.log('gameover')
      veggies.splice(i, 1)
      }
    }
  }
}
// }

function movementHandler(e) {
  const speed = 60;
  console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      shopper.x = shopper.x - speed;
      break;
    case "ArrowRight":
      shopper.x = shopper.x + speed;
      break;
  }
}

canvas.addEventListener("click", (e) => {
  console.log(`x is ${e.offsetX} y is ${e.offsetY}`);
})

document.querySelector("#restart").addEventListener("click", function () {
  console.log("hey");
  location.reload();
}) 

function addPoints(){
  score + 50
}