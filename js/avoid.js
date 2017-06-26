var g = 0.9800623;
var box;
var rain = [];

function setup(){
    background(255,255,255);
    createCanvas(700,600);
    box = new Rect();
    for(var i = 0; i < 20 ; i++){
        rain.push(new Rain());
    }
    box.setStart();
    noStroke();
}

function draw(){
    background(0,0,0);
    box.render();
     for(var j = 0; j < rain.length ; j++){
        rain[j].render();
    }
}


class Rain{
    constructor(){
        this.x = random(10 , width -10);
        this.y = -200;
        this.w = random(2,3);
        this.h = random(5,20);
        this.m = this.h / this.w;
    }

    render(){
        this.update();
        fill(5,164,250);
        rect(this.x, this.y, this.w, this.h);
    }

    update(){
        this.y += this.m;

        if(this.y > height + this.h){
            this.x = random(10 , width -10);
            this.y = 5;
        }

        if(box.y < this.y + this.h + 10 ){
            if(box.x < this.x && box.x + box.size > this.x + this.w){
                this.stop();
            }else{
                
            }
        }
    }

    stop(){
        console.log('stop');
    }
}


class Rect{

    constructor(){
        this.x = 0;
        this.y = 0;
        this.size = 30;
        this.m = 5;
        this.move = true;
        this.speed = 6;
    }

    render(){
        this.update();
        fill(255,255,255)
        rect(this.x, this.y, this.size, this.size)
       
    }

    update(){
        this.controller();
        if(this.y > height - this.size){
            this.move = false;
        }

        if(this.x > width + this.size){
            this.x = 0;
        }else if(this.x < -20){
            this.x = width - this.size;
        }
    }

    controller(){
        if(keyIsDown(LEFT_ARROW)){
            this.x -= this.speed;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.x += this.speed;
        }
    }

    setStart(){
        this.x = width/2 - this.size / 2;
        this.y = height - this.size - 2;
    }

}

