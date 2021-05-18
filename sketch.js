var backImage,backgr;
var rabbit,rabbitImage;
var ground,ground_img;

var FoodGroup, carrotImage;
var obstaclesGroup, lionImage;


var score=0;


function preload(){
  backImage=loadImage("jungle.png");
  rabbitImage=loadImage("rabbit.png");
  
  

  carrotImage = loadImage("carrot.png");
  lionImage = loadImage("lions.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=2.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  rabbit = createSprite(100,340,20,50);
  rabbit.addImage(rabbitImage);
  rabbit.scale = 1.0;
  
  ground = createSprite(400,350,8000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(rabbit)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: rabbit.scale=0.12;
                break;
        case 20: rabbit.scale=0.14;
                break;
        case 30: rabbit.scale=0.16;
                break;
        case 40: rabbit.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      rabbit.velocityY = -12;
    }
    rabbit.velocityY = rabbit.velocityY + 0.8;
  
    rabbit.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(rabbit)){ 
        rabbit.scale=0.08;

    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var carrot = createSprite(600,250,40,10);
    carrot.y = random(120,200);    
    carrot.addImage(carrotImage);
    carrot.scale = 0.3;
    carrot.velocityX = -5;
     //assign lifetime to the variable
    carrot.lifetime = 300;
    rabbit.depth = rabbit.depth + 1;
    
    //add each carrot to the group
    FoodGroup.add(carrot);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var lion = createSprite(800,300,10,40);
    lion.velocityX = -6;
    lion.addImage(lionImage);
    
    //assign scale and lifetime to the obstacle     
    lion.scale = 0.7;
    lion.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(lion);
  }
}