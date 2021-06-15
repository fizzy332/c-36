var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed
var lastFed

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feedthedog = createButton("Feed the dog")
feedthedog.position(700,95);
feedthedog.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  if(lastFed>12){
    text("last feed : 1pm",350,30)
  }
  else if(lastFed<=0){
    text("last feed : 12am",350,30)
  }
  else{
    text ("last feed : 10am",350,30)
  }
  

 
 
 
  

 
  drawSprites();
}
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
   
  var foodstock2= foodObj.getFoodStock();
  if(foodstock2<=0){
    foodObj.updateFoodStock(foodstock2*0)
  }
  else{
    foodObj.updateFoodStock(foodstock2-1)
  }
  
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
