var PLAY = 1;
var END = 0;
var gameState = PLAY;

var swordSprite, swordSpriteImage;

var fruit1, fruit2, fruit3, fruit4;

var alienSprite, alienSprite_image;

var fruitGroup, alienSpriteGroup;

var gameOverImage;

var score

function preload()
{
  // loads swordSprite animtion
  swordSpriteImage = loadImage("sword.png");
  
  // loads fruit animtion
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png"); 
  fruit4 = loadImage("fruit4.png");
  
  // loads alienSprite animtion  
  alienSprite_image = loadAnimation("alien1.png", "alien2.png");
  
  // loads game over image animtion
  gameOverImage = loadImage("gameover.png") ;
}

function setup()
{
 // creates play area 
 createCanvas(600,600);
  
  // creates swordSprite 
  swordSprite = createSprite(40,200,20,20);
  swordSprite.addImage(swordSpriteImage);
  swordSprite.scale = 0.7;
    
  // creates groups
  fruitGroup = createGroup();
  alienSpriteGroup = createGroup();
  
  // sets the collider
  swordSprite.setCollider("rectangle",0,0,70, 70);
  swordSprite.debug = false;
  
  // initial score
  score = 0;
  
}

function draw()
{
  // background colour 
  background("pink");
  
  // displays score
  text("Score: "+ score, 500,50);
  
  // game state play
  if(gameState === PLAY)
  {
     swordSprite.y = World.mouseY;
     swordSprite.x = World.mouseX;
 
    
     spawnfruits();
     spawnalienSprite();
   
  if(fruitGroup.isTouching(swordSprite))
  {
     fruitGroup.destroyEach();
     score = score+2; 
  }
    
    if(alienSpriteGroup.isTouching(swordSprite))
    {
      alienSpriteGroup.destroyEach();
      gameState = END;
    }
  }
    // game state end  
  else 
    if (gameState === END) 
   {   
     swordSprite.velocityY = 0
     
    // sets lifetime
    fruitGroup.setLifetimeEach(-1);
    alienSpriteGroup.setLifetimeEach(-1);
     
    // sets velocity
    fruitGroup.setVelocityXEach(0);
    alienSpriteGroup.setVelocityXEach(0);
     
    swordSprite.addImage(gameOverImage);
    swordSprite.scale = 2;
    swordSprite.x = 300;
    swordSprite.y = 300;
   }
 
  // displays sprite
  drawSprites();
}

// spawns fruits
function spawnfruits()
{
 if (frameCount % 80 === 0)
 {
   var fruit = createSprite(400, Math.round(random(20,370)));
   
    //generate random fruits
    var rand = Math.round (random(1,4));
    fruit.velocityX = -6;
   
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default:break;
    }
   
    //assign scale and lifetime to the fruit           
    fruit.scale = 0.2;
    fruit.lifetime = 300;
   
   //add each fruit to the group
    fruitGroup.add(fruit);
 }
}

// spwans alienSprite
function spawnalienSprite()
{
 if (frameCount % 200 === 0)
 {
   var alienSprite = createSprite(400, Math.round(random(20,670)));  
   alienSprite.addAnimation("alien", alienSprite_image);

   
    //generate random fruits
    var rand = Math.round (random(1,2));
    alienSprite.velocityX = -6;
     
    //assign scale and lifetime to the alienSprite           
    alienSprite.scale = 1;
    alienSprite.lifetime = 300;
   
   //add each alienSprite to the group
    alienSpriteGroup.add(alienSprite);
 }
}


