/* 다수 원형 과 한 원형의 충돌감지 */ 

var ab;
var bb = []

function setup(){
    createCanvas(window.innerWidth/1.5,window.innerHeight);
    background(0,0,0);
    ab = new Aball();
    
    for(var i = 0; i < 100 ; i++){
        bb.push(new Bball());    
    }
    noStroke();
}

function draw(){
    background(0,0,0);
    ab.render();
    bb.forEach(function(element) {
       element.render(); 
    }, this);
    //bb.render();
    
}

function Aball(){
    this.x = width/2;
    this.y = height/2;
    this.size = 10;
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

    if(this.x > width - 10 || this.x < 10){this.vx = -this.vx;}
    if(this.y > height - 10 || this.y < 10){this.vy = -this.vy;}

    bb.forEach(function(element) {
    
    var orderx = this.x - element.x;
    var ordery = this.y - element.y;



    var distancX = Math.pow(orderx,2);
    var distancY = Math.pow(ordery,2);

    var After = {
        MoveBetween : Math.sqrt(distancX + distancY) ,
        Between : element.size/2 + this.size/2    
    }

    if(After.MoveBetween < After.Between){

        this.vx = this.vx;
        this.vy = -this.vy;
    }
        
    }, this);

}

function Bball(){
    this.x = random(20 , width - 20);
    this.y = 20;
    this.size = random(10,30);
    this.vx = random(-2 , 2);
    this.vy = this.size/7;
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

    /*
    bb.forEach(function(element) {

    var dx = Math.pow(this.x - element.x,2);
    var dy = Math.pow(this.y - element.y,2);

    var Before = {
        MoveBetween : Math.sqrt(dx + dy) ,
        Between : element.size/2 + this.size/2    
    }

    if(Before.MoveBetween < Before.Between){
        this.vx = -this.vx;
        this.vy = -this.vy;
    }
        
    }, this);

    */
}