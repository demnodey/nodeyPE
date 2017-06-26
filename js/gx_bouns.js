var g = 0.9800623;
var box;

function setup(){
    background(0,0,0);
    createCanvas(300,600);
    box = new Rect();
    box.setStart();
}

function draw(){
    background(0,0,0);
    box.render();
}


class Rect{

    constructor(){
        this.x = 0;
        this.y = 0;
        this.size = 40;
        this.m = 5;
        this.move = true;
    }

    render(){
        this.update();
        fill(255,255,255)
        rect(this.x, this.y, this.size, this.size)
       
    }

    update(){
        this.controller();
        if(this.move){
            this.y += this.m * g;
        }else{
            this.y =  height - this.size;
        }
        
        if(this.y > height - this.size){
            this.move = false;
        }
    }

    controller(){
        if(keyIsDown(UP_ARROW)){
            this.move = true;
            this.y -= this.m * 2;
        }
        if(keyIsDown(LEFT_ARROW)){
            this.x -= this.m * 2;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.x += this.m * 2;
        }
        /*if(keyIsDown(DOWN_ARROW)){
            if(this.y < height - this.size){ 
               this.y += this.m * 2;
            }
        }*/
       
    }

    setStart(){
        this.x = width/2 - this.size/2;
        this.y = 30;
    }

}

