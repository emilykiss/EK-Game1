console.log("is this workin 👀")
const body = document.querySelector("body")
const canvas = document.querySelector("#canvas")
const updatedScore = document.querySelector("#score")
const collide = document.querySelector("#status1")
document.addEventListener("keydown", movementHandler)


//Setting the dimensions of the canvas
const ctx = canvas.getContext("2d")

//Had to set the dimensions to hard numbers- screen was acting wonky
canvas.height = 444
canvas.width = 880

//This score will change after running the gameLoop function
let score = 100;

setInterval(gameLoop, 60)


const shopperSprite = new Image()
shopperSprite.src = "./images/shopper.png"
const donutSprite = new Image()
donutSprite.src = "./images/donut.png"
const veggieSprite = new Image()
veggieSprite.src = "./images/tomato.png"



//setting an object that contains the player's info
class Object {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.active = true;
    this.image = image
  }

  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    // ctx.fillStyle = this.color
    // ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

//This function is used to generate a random number for spawning objs
function generateRandom() {
  let randomNumber = Math.floor(Math.random() * canvas.width - 30)
  return randomNumber
}

//My character and obstacles - X is randomly generated and Y is 0 so that the objects pop up only on the x axis
const shopper = new Object(5, 340, 100, 100, shopperSprite)
const donut = new Object(generateRandom(), 0, 100, 100, donutSprite)
const veggie = new Object(generateRandom(), 0, 1000, 1000, veggieSprite)

// function drawBox(x, y, w, h, color) {
//   ctx.fillStyle = color
//   ctx.fillRect(x, y, w, h)
// }

//My gravity function- rate at which items are falling
const speed = 10
const drop = setInterval(function () {
  donut.y += speed
  veggie.y += speed
})

//Arrays to push the foods into - we will need this for the gameLoop to operate
let donuts = []
let veggies = []

const donutSpawn = setInterval(function () {
  donuts.push(new Object(generateRandom(), 0, 120, 140, donutSprite))
}, 3000)

const veggieSpawn = setInterval(function () {
  veggies.push(new Object(generateRandom(), 0, 100, 120, veggieSprite))
}, 3500)

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shopper.render();
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].render();
    donuts[i].y += speed;
    if (
      shopper.x < donuts[i].x + donuts[i].width &&
      shopper.x + donuts[i].width > donuts[i].x &&
      shopper.y < donuts[i].y + donuts[i].height &&
      shopper.y + shopper.height > donuts[i].y
    ) {
      collide.innerText = "🍩 Keep it up! 🍩";
      donuts.splice(i, 1);
      updatedScore.innerText = score;
      score = score + 50;
    }
  }
  for (let i = 0; i < veggies.length; i++) {
    veggies[i].render();
    veggies[i].y += speed;
    if (
      shopper.x < veggies[i].x + veggies[i].width &&
      shopper.x + veggies[i].width > veggies[i].x &&
      shopper.y < veggies[i].y + veggies[i].height &&
      shopper.y + shopper.height > veggies[i].y
    ) {
      collide.innerText = "GAME OVER! I wanted that donut! 😓🍅";
      veggies.splice(i, 1);
      score = 0;
      updatedScore.innerText = 0;
      if (score === 0) {
        clearInterval(donutSpawn);
        clearInterval(veggieSpawn);
      }
    }
  }
}
// }
//Controls the arrow keys and speed of the player
function movementHandler(e) {
  const speed = 80;
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

//Start new game- reload the page
document.querySelector("#restart").addEventListener("click", function () {
  console.log("hey")
  location.reload()
});
