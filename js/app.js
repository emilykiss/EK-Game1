console.log("is this workin 👀");
const canvas = document.querySelector("#canvas");
const updatedScore = document.querySelector("#score");
const collide = document.querySelector("#status1");
document.addEventListener("keydown", movementHandler)

//Setting the dimensions of the canvas
const ctx = canvas.getContext("2d");

//Had to set the dimensions to hard numbers- screen was acting wonky 
canvas.height = 444
canvas.width = 880

//This score will change after running the gameLoop function
let score = 100;

setInterval(gameLoop, 60);


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

//This function is used to generate a random number for spawning objs
function generateRandom(){
  let randomNumber = Math.floor(Math.random()*canvas.width - 30)
  return randomNumber
}

//My character and obstacles - X is randomly generated and Y is 0 so that the objects pop up only on the x axis
const shopper = new Object(5, 360, "hotpink", 80, 80);
const donut = new Object(generateRandom(), 0, "hotpink", 32, 48);
const veggie = new Object(generateRandom(), 0, "lightgreen", 32, 48);

function drawBox(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h)
}

//My gravity function- rate at which items are falling
const gravity = 10;
const drop = setInterval(function () {
  donut.y += gravity;
  veggie.y += gravity;
})


//Arrays to push the foods into - we will need this for the gameLoop to operate 
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
//Controls the arrow keys and speed of the player 
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

//Start new game- reload the page
document.querySelector("#restart").addEventListener("click", function () {
  console.log("hey");
  location.reload();
}) 

function addPoints(){
  score + 50
}