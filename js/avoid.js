var box , score, hitSound, skill;
var rain = [];
var item = [];

function setup(){
    background(255,255,255);
    createCanvas(windowWidth,600);
    skill = new Skill();
    rain.push(new Rain);
    item.push(new DropItem); 
    score = new Score();
    box = new Player();
    box.setStart();
    //backSound.loop();
    noStroke();
}

function draw(){
    background(0,0,0);
    score.render();
    box.render();
    skill.render();
    //for(var j = 0; j < rain.length; j++){ rain[j].render(); }
    for(var i = 0; i < item.length; i++){ item[i].render(); }

    if(frameCount%200 == 0){ addRain(); }
    if(frameCount%1500 == 0){ addItem(); }

}

function preload(){
    hitSound = loadSound('asset/sound/play_hit.mp3');
    hitSound.setVolume(0.1);
    backSound = loadSound('asset/sound/background_rain.mp3');
    backSound.setVolume(0.2);
    shieldImg = loadImage('asset/img/shield.png');
}

function addRain(){
    for(var i = 0; i < 2; i++){
        rain.push(new Rain);
    }
}

function addItem(){
    for(var i = 0; i < 1; i++){
        item.push(new DropItem);
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
                    hitSound.play();
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

class DropItem{
    constructor(){
        this.x = 0;
        this.sx = random(150, width -150);
        this.y = -100;
        this.size = 20;
        this.m = 0.8;
        this.angle = 0;
    }

    render(){
        this.createHeal();
    }

    createHeal(){
        fill(0,255,0);
        this.angle += 0.02;
        this.x = (cos(this.angle)*200) + this.sx;
        this.y += this.m;
        rect(this.x , this.y , this.size , this.size, 4);

        if(box.x < this.x && box.x + box.size > this.x + this.size && box.y < this.y + this.size){
            if(box.hp != 0){
                if(box.hp < 90){
                        box.hp += 10;
                }else{
                        box.hp = 100;
                }
             }
            this.reset();
         }

        if(this.y > height){ this.reset(); }
    }

    reset(){
        this.y = -200;
        this.m = 0;
    }
}

class Skill{
    constructor(){
        this.x = 20;
        this.y = height/2 - 100;
        this.size = 50;
    }

    render(){
        fill(246,180,0);
        image(shieldImg, this.x, this.y);
    }

    update(){
        
    }
}

