//동공지진 

function setup(){
    createCanvas(200, 200);
    background(0,0,0);
    
}

function draw(){
    
    this.x = width/2;   // x 절대 위치
    this.y = height/2;  // y 절대 위치

    this.ziX = random(this.x-10, this.x+10); // x축 진동 이동
    this.ziY = random(this.y-10, this.y+10); // y축 진동 이동
    background(0,0,0); // 배경입히기
    ellipse(this.ziX, this.ziY, 20, 20); // 그리기
}