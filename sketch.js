var boy,mask,vaccine,covid,park,gameover;
var boyImg,maskImg,vaccineImg,covidImg,parkImg,gameoverImg;
var score = 0;
var maskG,vaccineG,covidG;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  maskImg = loadImage("mask.png");
  vaccineImg = loadImage("vaccine.png");
  covidImg = loadImage("COVID.png");
  parkImg = loadImage("park.png")
  gameoverImg = loadImage("gameover.PNG");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);

park = createSprite(width/2,200);
park.addImage(parkImg);
park.velocityY=5;
park.scale=3;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SidRunning",boyImg);
boy.scale=0.08;
  
  
maskG=new Group();
vaccineG=new Group();
covidG=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  boy.y = World.mouseY;
  score = score + Math.round(getFrameRate()/60);
  park.velocityY = (6 + 3*score/1000);
    
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(park.y > height ){
    park.y = height/2;
  }

  
    createMask();
    createVaccine();
    createCovid();

    if (maskG.isTouching(boy)) {
      maskG.destroyEach();
      score=score+200;
    }
    else if (vaccineG.isTouching(boy)) {
      vaccineG.destroyEach();
      score=score+500;
      
    }else{
      if(covidG.isTouching(boy)) {
      covidG.destroyEach();  
      score=score-2000;

      }
  if(score<0){
    gameState=END;
    boy.addAnimation("SidRunning",gameoverImg);
    boy.x=width/2;
    boy.y=height/2;
    boy.scale=0.6;
    maskG.destroyEach();
    maskG.setVelocityEach(0);
    vaccineG.destroyEach();
    vaccineG.setVelocityEach(0);
    covidG.destroyEach();
    covidG.setVelocityEach(0); 
      } 
      
  }
  
  drawSprites();
  textSize(30);
  fill(255);
  text("Score: "+ score,width-700,30);
  }

}

function createMask() {
  if (World.frameCount % 100 == 0) {
  var mask = createSprite(Math.round(random(50, 50),40, 10, 200));
  mask.addImage(maskImg);
  mask.scale=0.01;
  mask.velocityY = 8;
  mask.lifetime = 200;
  maskG.add(mask);
  }
}

function createVaccine() {
  if (World.frameCount % 250 == 0) {
  var vaccine = createSprite(Math.round(random(200,400),200, 200, 200));
  vaccine.addImage(vaccineImg);
  vaccine.scale=0.08;
  vaccine.velocityY = 10;
  vaccine.lifetime = 200;
  vaccineG.add(vaccine);
}
}

function createCovid(){
  if (World.frameCount % 200 == 0) {
  var covid = createSprite(Math.round(random(200, height-50),40, 10, 10));
  covid.addImage(covidImg);
  covid.scale=0.1;
  covid.velocityY = 15;
  covid.lifetime = 200;
  covidG.add(covid);
  }
  
}
