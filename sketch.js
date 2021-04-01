var dog
var dogImage
var happyDog
var milkImage
var database
var foodS
var foodStock
var feed
var bedroom
var bgImage

function preload()
{
  dogImage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
  milkImage=loadImage("images/milk.png")
  bgImage=loadImage("vp4/Food Stock.png")
}

function setup() {
  createCanvas(800, 800);
  database=firebase.database()
  dog=createSprite(400,400,20,20)
  dog.addImage(dogImage)
  dog.scale=0.2
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  feed=createButton("Feed the dog");
  feed.position(700,95)
  feed.mousePressed(function()
  {
    writeStock()
  }
  )
  washroom=createButton("I want to use the washroom")
  washroom.position(700,250)
  washroom.mousePressed(function()
  {
    bgImage=loadImage("vp4/Wash Room.png")
  }
  )
  bedroom=createButton("I want to go to the bedroom")
  bedroom.position(500,250)
  bedroom.mousePressed(function()
  {
    bgImage=loadImage("vp4/Bed Room.png")
  }
  )
  garden=createButton("I want to go to the garden")
  garden.position(500,300)
  garden.mousePressed(function()
  {
    bgImage=loadImage("vp4/Garden.png")
  }
  )
  vac=createButton("Vaccination Time")
  vac.position(700,300)
  vac.mousePressed(function()
  {
    bgImage=loadImage("vp4/Vaccination.jpg")
  }
  )
}


function draw() {  
background(bgImage)
  displayMilk()
  drawSprites();
  textSize(25)
  fill("black")
  text("food left:"+ foodS,170,80)

  fill(255,255,254),
  textSize(15);

}
function writeStock(){
  if(foodS<=0){
    foodS=0
  }
  else{
    foodS=foodS-1
  }
  database.ref('/').update({
    food:foodS
  })
}
function readStock(data){
  foodS=data.val();
}
function feedDog(){
  dog.addImage(happyDog)
  foodS.updatefoodStock(foodS.getfoodStock()-1)
  database.ref('/').update({
    Food:foodS.getfoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function displayMilk(){
  var x=100
  for(var i=1 ; i<=foodS; i=i+1){
    image(milkImage,x,100,70,70)
    x=x+30
  }
}


