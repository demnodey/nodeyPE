var ballA; //Ball A
var ballB; //Ball B
var e = 1; //elastic modulus
 
function setup() {
   
  createCanvas(500,500);
  background(0,0,0);
  ellipseMode(CENTER);
   
  ballA = new Ball();
  ballB = new Ball();

}
 
function draw() {
   
  background(0,0,0);
  ballA.render();
  ballB.render();


 var dx = ballA.x - ballB.x;
  var dy = ballA.y - ballB.y;
  var dab = abs(sqrt(dx*dx + dy*dy));
   
  if(dab < ballA.r/2+ballB.r/2) {
     
    var sinTheta = dy / abs(sqrt(dx*dx + dy*dy));
    var cosTheta = dx / abs(sqrt(dx*dx + dy*dy));
    var vxAp = (ballA.mass - e*ballB.mass)/(ballA.mass + ballB.mass)*(ballA.vx*cosTheta + ballA.vy*sinTheta) + (ballB.mass + e*ballB.mass)/(ballA.mass + ballB.mass)*(ballB.vx*cosTheta + ballB.vy*sinTheta);
    var vxBp = (ballA.mass + e*ballA.mass)/(ballA.mass + ballB.mass)*(ballA.vx*cosTheta + ballA.vy*sinTheta) + (ballB.mass - e*ballA.mass)/(ballA.mass + ballB.mass)*(ballB.vx*cosTheta + ballB.vy*sinTheta);
    var vyAp = ballA.vx*(-sinTheta) + ballA.vy*cosTheta;
    var vyBp = ballB.vx*(-sinTheta) + ballB.vy*cosTheta;
     
    ballA.vx = vxAp*cosTheta + vyAp*(-sinTheta);
    ballA.vy = vxAp*sinTheta + vyAp*cosTheta;
    ballB.vx = vxBp*cosTheta + vyBp*(-sinTheta);
    ballB.vy = vxBp*sinTheta + vyBp*cosTheta;
     
    //if two ball is overlaped, seperate from each other.
    /*var angleAB = atan2(dy,dx);
    var angleBA = atan2(-dy,-dx); 
    var moveToDistance = abs(ballA.r + ballB.r) - dab;
    ballA.x = ballA.x + moveToDistance * cos(angleAB);
    ballB.x = ballB.x + moveToDistance * cos(angleBA);
     */
  }
 
  if(ballA.x < ballA.r/2 || ballA.x > width - ballA.r/2){ballA.vx *= -1;}
  if(ballA.y < ballA.r/2 || ballA.y  > height - ballA.r/2){ballA.vy *= -1;}
  if(ballB.x + ballB.vx< ballB.r/2 || ballB.x + ballB.vx > width - ballB.r/2){ballB.vx *= -1;}
  if(ballB.y + ballB.vy< ballB.r/2 || ballB.y + ballB.vy > height - ballB.r/2){ballB.vy *= -1;}

}
 
// Ball
function Ball(){
    this.mass = 1;
    this.x = random(20 , width - 20);
    this.y = random(20 , height - 20);
    this.vx = 3;
    this.vy = 3;
    this.r = 50;
    this.clr = Math.floor(random(255))+","+Math.floor(random(255))+","+Math.floor(random(255));
}

 Ball.prototype.render = function(){
      this.update();
      fill(this.clr);
      ellipse(this.x, this.y, this.r, this.r);
      
}

Ball.prototype.update = function(){
  ballA.x += ballA.vx;
  ballA.y += ballA.vy;
  ballB.x += ballB.vx;
  ballB.y += ballB.vy;
}