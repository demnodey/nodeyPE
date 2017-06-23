/* 도형 충돌에 대한 운동보존 법칙 */

var ab , bb;
var e = 3;
var objects = [];

function setup(){
    createCanvas(500,450);
     background(0,0,0);
    ab = new Aball();
    for(var i = 0; i < 50; i++){
        objects.push(new Bball());
    }
    noStroke();
}

function draw(){
    background(0,0,0);
    ab.render();

    for(var i = 0; i < objects.length; i++ ){
        objects[i].render();
    }

    noStroke();
    
}

function Aball(){
    this.x = width/2;
    this.y = height/2;
    this.size = 130;
    this.mess = 1;
    this.vx = 0;
    this.vy = 0;
    this.wall = this.size / 2;
}

Aball.prototype.render = function(){
    //this.update();
    fill(255,0,0);
    ellipse(this.x, this.y, this.size, this.size);
    stroke(0);
    line(this.x-this.size/2,this.y,this.x+this.size/2,this.y);
    line(this.x,this.y-this.size/2,this.x,this.y+this.size/2);
   
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
    this.x = random(20,width-20);
    this.y = 20;
    this.size = 25;
    this.mess = 1;
    this.vx = random(-3,3);
    this.vy = random(-3,3);
}

Bball.prototype.render = function(){
    this.update();
    fill(255,255,255);
    ellipse(this.x, this.y, this.size, this.size);
    stroke(0);

}

Bball.prototype.update = function(){
   
    this.x += this.vx;
    this.y += this.vy;

    if(this.x > width - 10 || this.x < 10){this.vx = -this.vx;}
    if(this.y > height - 10 || this.y < 10){this.vy = -this.vy;}

    var dx = Math.pow(this.x - ab.x,2);
    var dy = Math.pow(this.y - ab.y,2);

    var bdx = this.x - ab.x;
    var bdy = this.y - ab.y;

    var crash = {
        MoveBetween : Math.sqrt(dx + dy) ,
        Between : ab.size/2 + this.size/2    
    }

    if(crash.MoveBetween < crash.Between){

    var sinTheta = bdy / crash.Between;
    var cosTheta = bdx / crash.Between;
    
    var vxAp = (this.mess - e*ab.mess)/(this.mess + ab.mess)*(this.vx*cosTheta + this.vy*sinTheta) + (ab.mess + e*ab.mess)/(this.mess + ab.mess)*(ab.vx*cosTheta + ab.vy*sinTheta);
    //var vxBp = (this.mess + e*this.mess)/(this.mess + ab.mess)*(this.vx*cosTheta + this.vy*sinTheta) + (ab.mess - e*this.mess)/(this.mess + ab.mess)*(ab.vx*cosTheta + ab.vy*sinTheta);
    var vyAp = this.vx*(-sinTheta) + this.vy*cosTheta;
    //var vyBp = ab.vx*(-sinTheta) + ab.vy*cosTheta;
     
    this.vx = vxAp*cosTheta + vyAp*(-sinTheta);
    this.vy = vxAp*sinTheta + vyAp*cosTheta;
    //ab.vx = vxBp*cosTheta + vyBp*(-sinTheta);
    //ab.vy = vxBp*sinTheta + vyBp*cosTheta;
        
    }
}