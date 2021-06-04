// Vehicle class & Steering behaviour code by Daniel Shiffman
// http://codingtra.in
// Steering Text Paths Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font, points_array,points_array2, ballSize, words;
var myText ='LALIQUE ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890';
var points1 = [];
var points2 = [];
var options={ sampleFactor: 0.2,simplifyThreshold: 0};
var splash=true;
function preload() {
  font = loadFont('data/Lalique.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fontSize=width/20;
  textSize(fontSize);
  //textSpacing(-fontSize/2);
  //textAlign(CENTER);
  background(0);
  words=myText.split(' ');
  textLeading(32*1.5);
  //let textBox = font.textBounds('run your mouse', 0, 0, fontSize);
  points_array = font.textToPoints('run your mouse over', 0, height/6, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
    let vehicle = new Vehicle(point.x, point.y, 4);
    points1.push(vehicle);
  }
}

function draw() {
  clear();
  background(51);
  
//  for(var i=0; i<words.length;i++) {
//  text(words[i], 20, i*32);
//  }
  
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
      } 
   }
}
function addLalique(){
  fontSize=30;
    //points1 = [];
    points_array = font.textToPoints('LALIQUE ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890', width/23, height/2, fontSize, options);  
  for(let i = 0; i < points_array.length; i++) {
    let point = points_array[i];
    let vehicle = new Vehicle(point.x, point.y, 4);
    points1.push(vehicle);
  } 
}
function Vehicle(x,y, ballSize) {
  //this.pos = createVector(x,y);
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.target = createVector(x,y);
  this.r = 8;
  this.maxspeed = 5;
  this.maxforce = 0.3;
  this.ballSize=ballSize;
  
  this.behaviors = function() {
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    
    arrive.mult(1);
    flee.mult(5);
    
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
