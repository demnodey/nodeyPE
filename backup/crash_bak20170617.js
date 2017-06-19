/* 두 원형 충돌감지 */ 

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
    this.size = 120;
    this.vx = 2;
    this.vy = 3;
}

Aball.prototype.render = function(){
    this.update();
    fill(255,0,0);
    ellipse(this.x, this.y, this.size, this.size);
   
}

Aball.prototype.update = function(){

    this.x += this.vx;
    this.y += this.vy;

    if(this.x > width - 60 || this.x < 60){this.vx = -this.vx;}
    if(this.y > height - 60 || this.y < 60){this.vy = -this.vy;}

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
    this.x = random(20 , width - 20);
    this.y = 20;
    this.size = 25;
    this.vx = 3;
    this.vy = 2;
}

Bball.prototype.render = function(){
    this.update();
    fill(0,255,0);
    ellipse(this.x, this.y, this.size, this.size);
}

Bball.prototype.update = function(){
    //console.log(ab);
    this.x += this.vx;
    this.y += this.vy;

    if(this.x > width - 10 || this.x < 10){this.vx = -this.vx;}
    if(this.y > height - 10 || this.y < 10){this.vy = -this.vy;}

    var distancX = Math.pow(this.x - ab.x,2);
    var distancY = Math.pow(this.y - ab.y,2);

    var After = {
        MoveBetween : Math.sqrt(distancX + distancY) ,
        Between : ab.size/2 + this.size/2    
    }

    if(After.MoveBetween < After.Between){
      
        this.vx = -this.vx;
        this.vy = -this.vy;
    }
}