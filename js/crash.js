/* 도형 충돌에 대한 운동보존 법칙 */

var ab , bb;

function setup(){
    createCanvas(300,300);
    background(0,0,0);
    ab = new Aball();
    bb = new Bball();
    noStroke();

}

function draw(){
    background(0,0,0);
    ab.render();
    bb.render();
    
}

function Aball(){
    this.x = width/2;
    this.y = height/2;
    this.size = 50;
    this.vx = 2;
    this.vy = 3;
    this.wall = this.size / 2;
}

Aball.prototype.render = function(){
    //this.update();
    fill(255,0,0);
    ellipse(this.x, this.y, this.size, this.size);
   
}

Aball.prototype.update = function(){

    this.x += this.vx;
    this.y += this.vy;

    if(this.x > width - this.wall || this.x < this.wall){this.vx = -this.vx;}
    if(this.y > height - this.wall || this.y < this.wall){this.vy = -this.vy;}

    var distancX = Math.pow(this.x - bb.x,2);
    var distancY = Math.pow(this.y - bb.y,2);

    var Afters = {
        MoveBetween : Math.sqrt(distancX + distancY) ,
        Between : bb.size/2 + this.size/2    
    }

    if(Afters.MoveBetween < Afters.Between){
      
        this.vx = -this.vx;
        this.vy = -this.vy;
    }

}

function Bball(){
    this.x = 20;
    this.y = height/2 - 30;
    this.size = 25;
    this.mess = 2;
    this.vx = 2;
    this.vy = 0;
}

Bball.prototype.render = function(){
    this.update();
    fill(0,255,0);
    ellipse(this.x, this.y, this.size, this.size);
}

Bball.prototype.update = function(){
   
    this.x += this.vx;
    this.y += this.vy;

    if(this.x > width - 10 || this.x < 10){this.vx = -this.vx;}
    if(this.y > height - 10 || this.y < 10){this.vy = -this.vy;}

    var dx = Math.pow(this.x - ab.x,2);
    var dy = Math.pow(this.y - ab.y,2);

    var After = {
        MoveBetween : Math.sqrt(dx + dy) ,
        Between : ab.size/2 + this.size/2    
    }

    var radianX = -cos(this.x - ab.x/After.Between);
    var radianY = -sin(this.y - ab.y/After.Between);

    if(After.MoveBetween < After.Between){
      //this.vy = radianX;
     // this.vx = radianY;
    }
}