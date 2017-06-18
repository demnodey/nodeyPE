
'use strict';
var objects = [];
function setup(){

    createCanvas(window.innerWidth - 10, window.innerHeight - 10);
    background(0,0,0);
    for(var i=0;i<1;i++){
        objects.push(new Polygon);
    }
    noStroke();
}

function draw(){
   background(0,0,0);
   for(var i=0;i<objects.length;i++){
       objects[i].run();
   }
}

function Polygon(){

    this.x = random(40,width-40);
    this.y = 30;
    this.size = random(30, 50);
    this.accel = 0.1;
    
    fill(255,255,255);

    this.vx = random(-5,5);
    this.vy = this.size / 9;
}

Polygon.prototype.run = function(){
    this.update();
    ellipse(this.x , this.y, this.size, this.size);
}

Polygon.prototype.update = function(){

    this.x += this.vx;
    this.y += this.vy;

    if(this.x > width - 20){
        this.vx = -this.vx;
    }else if(this.x < 20){
        this.vx = -this.vx;
    }
    
    if(this.y > height - 20){
        this.vy = -this.vy;
    }else if(this.y < 20){
        this.vy = -this.vy;
    }

    for(var key in objects){
       var item = objects[key];
       var afterItemPosition = {
           x : item.x + item.vx,
           y : item.y + item.vy
       };
    }

   
}
