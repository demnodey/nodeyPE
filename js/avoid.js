var g = 0.9800623;
var box , score;
var rain = [];


function setup(){
    background(255,255,255);
    createCanvas(windowWidth,600);
    rain.push(new Rain);
    score = new Score();
    box = new Player();
    box.setStart();
    noStroke();
}

function draw(){
    background(0,0,0);
    score.render();
    box.render();
     for(var j = 0; j < rain.length; j++){
        rain[j].render();
    }

    if(frameCount%150 == 0){
        render()
    }
}

function render(){
    for(var i = 0; i < 1; i++){
        rain.push(new Rain);
    }
}

class Score{
    constructor(){
        this.count = 0;
    }
    
    render(){
        fill(255,255,255);
        textSize(50);
        textAlign(CENTER);
        text(this.count, width/2 , 80);

        if(box.hp == 0){
            this.count = 'You Die';
            push();
        }
    }
}


class Rain{
    constructor(){
        this.x = random(10 , width -10);
        this.y = -100;
        this.w = 5;
        this.h = 30;
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
            this.y = -200;
        }

        if(box.y < this.y + this.h + 10 ){
            if(box.hp != 0){
                if(box.x < this.x && box.x + box.size > this.x + this.w){
                    this.stop();
                    score.count -= 5;
                }else{
                    if(this.y > height){
                    score.count += 1;
                    }
                }
            }
        }
    }

    stop(){
        this.x = random(10 , width -10);
        this.y = -100;
        box.hp -= 10;
    }
}


class Player{

    constructor(){
        this.x = 0;
        this.y = 0;
        this.size = 30;
        this.speed = 6;
        this.hp = 100;
    }

    render(){
        this.health();
        this.update();
        fill(255,255,255);
        textSize(20);
        textAlign(CENTER);
        text("Player", this.x + this.size / 2 , this.y - this.size + 10);
        rect(this.x, this.y, this.size, this.size);
    }

    update(){
        this.controller();
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

    health(){
        fill(255,0,0);
        rect(20 , 20 , this.hp * 3 , 30);
    }

}
