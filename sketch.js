
var monkey , monkey_running
var banana ,bananaImage, stone, stoneImage
var bananaGroup, stoneGroup
var score

function preload(){
  
  backImage=loadImage("jungle.jpg")
  
  monkey_running =             loadAnimation("Monkey_01.png","Monkey_02.png",  "Monkey_03.png","Monkey_04.png","Monkey_05.png",      "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
 
}

 

function setup() {
    
  createCanvas(400,400)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,370,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  backStage = createSprite(200,200,900,10);
  backStage.addImage(backImage);
  backStage.velocityX=-4;
  backStage.x=backStage.width/2;
  backStage.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  bananaGroup = createGroup();
  
  stoneGroup = createGroup();
  
  score=0;
  
}


function draw() {
 background(255);
  
  
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(backStage.x<0) {
    backStage.x=backStage.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  
  //score=score + Math.round(getFrameRate()/60);
  
  switch(score){
    case 10: monkey.scale=0.12
            break;
    case 20: monkey.scale=0.14
            break;
    case 30: monkey.scale=0.16
            break;        
    case 40: monkey.scale=0.18
            break;
    default: break;
  }
  
  if(stoneGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }
  
  if(bananaGroup.isTouching(monkey)){
    score=score+2;
    bananaGroup.destroyEach();
  }
  
  spawnbanana();
  
  spawnstone();
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + score,100,50);
  
  camera.position.x="stone.png";
  camera.position.y="stone.png";
  
  
}

function spawnstone() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var stone = createSprite(400,350,40,10);
    stone.y = 350;
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.velocityX = -3;
    
     //assign lifetime to the variable
    stone.lifetime = 200;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    //obstacle.collide(ground);
    
    //add each cloud to the group
    stoneGroup.add(stone);
  }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(300,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}



