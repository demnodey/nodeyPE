var graph;
var ball;
var graphx;

function setup(){
    createCanvas(600,500);
    background(0,0,0);
    graph = new Graph();
    graphx = new GraphX();
    noStroke();
}

function draw(){

    translate(0 , height/2);
    graph.render();
    graphx.render();
    
}

function Graph(){
    this.seta = 0;
    this.angle = 0;
    this.x = 0;
    this.y = 0;
    this.size = 4;

}

Graph.prototype.render = function(){
    this.update();
    fill(255,0,0);
    ellipse(this.x, this.y, this.size, this.size);
    
}

Graph.prototype.update = function(){
    
    this.angle += 0.04;

    this.x += Math.PI / 2;
    this.y = sin(this.angle) * 50;
  
    if(this.x > width){
        this.x = 0;
    }
}


function GraphX(){
    this.seta = 0;
    this.angle = 0;
    this.x = 0;
    this.y = 0;
    this.size = 4;

}

GraphX.prototype.render = function(){
    this.update();
    fill(0,0,255);
    ellipse(this.x, this.y, this.size, this.size);
    
}

GraphX.prototype.update = function(){
    /*
    if(this.x > 99.98){
        //background(0,0,0);
    }
    */

    this.angle -= 0.04;

    this.x += Math.PI / 2;
    //this.x = cos(this.angle) * 100;
    this.y = sin(this.angle) * 50;

    if(this.x > width){
         this.x = 0;
    }

}