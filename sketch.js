var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed;


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
  feedButton=createButton("Feed The Dog");
  feedButton.position(600,95);
  feedButton.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref("FeedTime").on("value",(data)=>{
    lastFed=data.val();
    //foodObj.getFedTime(lastFed);
  })
  
 
  //write code to display text lastFed time here
  if(lastFed>=12){
    text((lastFed-12)+" PM",500,95);
  }
  else if(lastFed==0){
    text("12 AM", 500,95);
  }
  else{
    console.log(lastFed);
    textSize(15);
    fill("black");
    text(lastFed+" AM",500,20);
    
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

  //write code here to update food stock and last fed time
  var food_stock= foodObj.getFoodStock(); 
  if(food_stock<=0){
    foodObj.updateFoodStock(0);
  }
  else{
    foodObj.updateFoodStock(food_stock-1);
  }
  var h=hour();

  database.ref("/").set({
    FeedTime:h,
  Food:food_stock-1

})


}

//function to add food in stock

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
