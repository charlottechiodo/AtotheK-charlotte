// Vehicle class & Steering behaviour code by Daniel Shiffman
// http://codingtra.in
// Steering Text Paths Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font, points_array,points_array2, ballSize;
var points1 = [];
var points2 = [];
var options={ sampleFactor: 0.2,simplifyThreshold: 0};
var splash=true;
function preload() {
  font = loadFont('data/Lalique.otf');
}
//instead of drawing it as text, want to get the points/vertices of the letters

function setup() {
  createCanvas(windowWidth, windowHeight);
  fontSize=35;
  textSize(fontSize);
  //textSpacing(-fontSize/2);
  //textAlign(CENTER);
  points_array = font.textToPoints('run your mouse over', width/3.8, height/7, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
    let vehicle = new Vehicle(point.x, point.y, 4);
    points1.push(vehicle);
  }
}

function draw() {
  clear();
  background(0);
  rect(width/5,height/13, 850, 675);
  fill(0);
 
  for(let i = 0; i < points1.length; i++) {
    let point = points1[i];
    point.update();
    point.behaviors();
    point.show();
  }
  if (splash==true) {
    if (frameCount>250){
      splash=!splash;
      addLalique();
      addAlpha1();
      addAlpha2();
      addNumbers();
      } 
   }
}

function addLalique(){
  fontSize=73;
    points_array = font.textToPoints('LALIQUE', width/3.2, height/3, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
   let vehicle = new Vehicle(point.x, point.y, 4);
   points1.push(vehicle);
 } 
}

function addAlpha1(){
  fontSize=60;
    points_array = font.textToPoints('ABCDEFGHIJKLM', width/4.5, height/2, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
   let vehicle = new Vehicle(point.x, point.y, 4);
   points1.push(vehicle);
 } 
}

function addAlpha2(){
  fontSize=60;
    points_array = font.textToPoints('NOPQRSTUVWXYZ', width/4.5, height/1.5, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
   let vehicle = new Vehicle(point.x, point.y, 4);
   points1.push(vehicle);
 } 
}

function addNumbers(){
  fontSize=60;
    points_array = font.textToPoints('1234567890', width/3.5, height/1.2, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
   let vehicle = new Vehicle(point.x, point.y, 4);
   points1.push(vehicle);
 } 
}

function Vehicle(x,y, ballSize) {
  this.pos = createVector(random(width), random(height)); //starting position
  this.vel = p5.Vector.random2D(); //velocity
  this.acc = createVector(); //acceleration
  this.target = createVector(x,y); //target position
  this.r = 8;
  this.maxspeed = 5; //desired velocity
  this.maxforce = 0.3; //how good it is at steering and returning back to original position
  this.ballSize=ballSize;
  
  this.behaviors = function() {//accumulates a bunch of behaviours
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    
    arrive.mult(1);
    flee.mult(5);//fleeing force is much stronger than arriving force
    
    this.applyForce(arrive);
    this.applyForce(flee);
  }
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.arrive = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    let speed = this.maxspeed;
    if ( distance < 300 ) {
      speed = map(distance, 0, 100, 0, this.maxspeed);
    } 
    
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    
    return steer;
  }
  
  this.flee = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    if ( distance < 50 ) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);

      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
  
  this.show = function() {
    stroke(255);
    strokeWeight(this.ballSize);
    point(this.pos.x, this.pos.y);
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  points1=[];
  fontsize=width/20;
  points_array = font.textToPoints('run your mouse over', 0, height/6, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
    let vehicle = new Vehicle(point.x, point.y, 4);
    points1.push(vehicle);
  }
}
