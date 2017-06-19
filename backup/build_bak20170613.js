/* 다중 원형 벽충돌감지 */
var objects = [];
var ball;
function setup(){

    createCanvas(600, 700);
    background(0,0,0);
    for(var i=0;i<10;i++){
        objects.push(new Polygon);
    }
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

    
    fill(255,255,255);

    this.vx = 3;
    this.vy = this.size / 10;
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
        this.vx = -this.vx
    }
    
    if(this.y > height - 20){
        this.vy = -this.vy;
    }else if(this.y < 20){
        this.vy = -this.vy;
    }
}
