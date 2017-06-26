var objects = [];
var distance,start,temp;
var e = 1;
 
function setup(){
    start = 230;
    createCanvas(600,400);
    background(0,0,0);
    for(var i = 0; i < 5; i++){
        objects.push(new Polygon(start)); 
        distance = objects[i].r; 
        start += distance; 
    }
    objects[0].getStart();
    noStroke();
}
 
function draw(){
    background(0,0,0);
    translate(0, height/2);
    for(var i = 0; i < objects.length; i++){
        objects[i].render();
    }
}

class Polygon{
 
    constructor(x){
        this.x = x;
        this.y = 0;
        this.r = 40;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
    }
 
    render(){
        this.update();
        fill(255,255,255);
        ellipse(this.x,this.y,this.r,this.r);
    }
 
    update(){ 
         this.x -= this.ax;
 
        for(var i = 0; i < objects.length; i++){
        
            var dx = Math.pow(this.x - objects[i].x,2);
            var md = Math.sqrt(dx);
            var d = (this.r/2) + (objects[i].r/2);
            
            if(md < d){
                temp = this.ax;
                this.ax = objects[i].ax;
                objects[i].ax = temp * e;                
             }
        }
 
        if(this.x > width - this.r || this.x < this.r){
            this.ax *= -1;
        }
    }
 
    getStart(){
        this.ax = 3;
    }
}
