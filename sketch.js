const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var ground;
var backgroundImg,towerImg,tower;
var cannon,ball;
var angle = 20;
var balls = [];
var boat;
var boats = [];

function preload() {
  towerImg = loadImage("./assets/tower.png");
  backgroundImg = loadImage("./assets/background.gif");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 20;

  var options={
    isStatic:true
  };
  ground = Bodies.rectangle(0,height - 1,width, 10, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle); 
  
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width, 10);
  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160 ,310);
  pop();
  cannon.display();

  showBoats();

  for(var i = 0; i<balls.length;i = i+1){
    showBalls(balls [i], i);
  }
  
}

function keyReleased() {
  if(keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}
function keyPressed() {
  if(keyCode === DOWN_ARROW){
    ball = new Cannonball(cannon.x, cannon.y);
    balls.push(ball);
  }
}
function showBalls(ball, i) {
  if(ball){
    ball.display();
  }
}
function showBoats() {
  if(boats.length>0){
    if(
      boats[boats.length-1]===undefined || 
      boats[boats.length-1].body.position.x<width-300
    ){
      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      boat = new Boat(width, height-100, 170, 170, position);
      boats.push(boat);
    }
    
    for(var i = 0; i<boats.length;i = i+1){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body, {
          x:-0.9, y:0
        })
        boats[i].display();
      }
    }
  }
  else{
    boat = new Boat(width-79, height-60, 170, 170, -80);
    boats.push(boat);
  }
}
