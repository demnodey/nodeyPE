
'use strict';
var objects = [];
var angle = 0;
var x = 150;
var y = 150;
var av = 0;
function setup(){

    createCanvas(400,400);
    background(0,0,0);
    for(var i = 0 ; i < 4 ; i++){
        objects.push(new Polygon);
    }
    noStroke();
}

function draw(){
   //av += 0.001;
   background(0,0,0);
   translate(width/2, height/2);
   rotate(angle);
   for(var i =0; i < objects.length; i++){
       objects[i].run();
   }

   angle += 0.15;
   if(angle > 50){
       angle = 0;
   }
}

function Polygon(){

 this.vx = 0.9;
 this.vy = 0.9;
 this.size = 30;
 this.speed = 3;


  if(x > 0){
    this.x = x - 150;
    x = x - 150;

  }else if(x < 0){
    this.x = x + 150;
    x = x + 150;

  }else if(x == 0){

      if(y > 0){
          this.x = x + 150;
          x = x + 150;
      }else if(y < 0){
          this.x = x - 150;
          x = x - 150;
      }
  }

  if(this.x < 0){
    this.y = 0;
  }else if(this.x > 0){
    this.y = 0;
  }else if(this.x == 0){

      if(y > 0){
        this.y = y - 300;    
        y = -150;
    }else if(y < 0){
        this.y = y + 300;
        y = 150;
      }
  }

}

Polygon.prototype.run = function(){
    this.update();
   ellipse(this.x , this.y , this.size , this.size);
}

Polygon.prototype.update = function(){
  
  //this.vx += 0.2;

  objects[0].y += this.vy; 
  
  if(objects[0].y  > -50){
      this.vy = -this.vy;
  }else if(objects[0].y < -150){
      this.vy = -this.vy;
  }

  objects[1].x += this.vx;

  if(objects[1].x  > -50){
      this.vx = -this.vx;
  }else if(objects[1].x < -150){
      this.vx = -this.vx;
  }

  objects[2].y -= this.vy;
  objects[3].x -= this.vx;
   
}
