var car, policecar;
var carimg, policarimg;
var gameState = "play";


function preload(){
 policecarimg = loadAnimation("../imgs/Police/1.png", "../imgs/Police/2.png", "../imgs/Police/3.png");
 carimg = loadImage("../imgs/Black_viper.png");
 traffic1=loadImage("../imgs/Ambulance.png");
 traffic2=loadImage("../imgs/Car.png");
 traffic3=loadImage("../imgs/Mini_truck.png");
 traffic4=loadImage("../imgs/Mini_van.png");
 traffic5=loadImage("../imgs/truck.png");
 traffic6=loadImage("../imgs/taxi.png");
 roadImg=loadImage("../imgs/trackImage.jpg");
 roadpic = loadImage("../imgs/gameover.png");
 bdaudio = loadSound("../audios/bgmusic.mp3");

}

function setup(){
  
  createCanvas(1500,700);
  gameover = createSprite(displayWidth/2,displayHeight/2-100);
  gameover.addImage(roadpic);
  gameover.visible= false;
  road=createSprite(displayWidth/2, 350);
  road.scale = 0.8;
  bdaudio.play();
  road.addImage(roadImg);
  car = createSprite(500,400);
  car.addImage(carimg);
  car.setCollider("rectangle", 0,0, 210, 80)
  policecar = createSprite(car.x - 300, car.y);
  policecar.addAnimation("police",policecarimg);
  road.velocityX=-3;
  trafficGroup = new Group();
  
  

}

function draw() {
  background("green")
  
  if (road.x< 0) {
   road.x = displayHeight/2;
  }

  policecar.y = car.y;
  policecar.x = car.x - 300;
  if(keyDown(LEFT_ARROW)){
    car.y -=10;
    
  }

  if(keyDown(RIGHT_ARROW)){
    
    car.y +=10;
    
  }

  if(keyDown(UP_ARROW)){
    
    car.x +=10;
    
    
  }

  if(keyDown(DOWN_ARROW)){
    
    car.x -=5;
    
  }
  if(trafficGroup.isTouching(car)){
    gameState = "end";
    trafficGroup.destroyEach();
    car.destroy();
    policecar.destroy();
    bdaudio.stop();
  }
  
  spawnObstacles();
  drawSprites();
  if(gameState === "end"){
    trafficGroup.setVisibleEach(false);
    road.velocityX = -2;
    gameover.depth = 4;
    gameover.visible=true;
  }
}


function spawnObstacles(){
  if(frameCount%60===0){
  traffic=createSprite(displayWidth + 100, Math.round(random(200,600)));
  var ran=Math.round(random(1,6));
  switch(ran){
    case 1:traffic.addImage(traffic1);
      break;

      case 2:traffic.addImage(traffic2);
      break;

      case 3:traffic.addImage(traffic3);
      break;

      case 4:traffic.addImage(traffic4);
      break;

      case 5:traffic.addImage(traffic5);
      break;

      case 6:traffic.addImage(traffic6);
      break;
      
  }
  
  traffic.setCollider("rectangle", 0,0, 210, 80);
  traffic.velocityX=-5;
  trafficGroup.add(traffic);
  }
}




