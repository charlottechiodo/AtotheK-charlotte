//taken inspiration from/acknowledgement to Coding Train tutorial - Steering Behaviours
var font;
var vehicles = [];
var Vehicle;

function Vehicle(x,y) {
this.pos = createVector(random(width), random(height)); //starting position
this.target = createVector(x,y); //target position
this.vel = p5.Vector.random2D(); //velocity
this.acc = createVector(); //acceleration
this.r = 8;
this.maxspeed = 15; //desired velocity
this.maxforce = 1; //how good it is at steering
}

Vehicle.prototype.behaviors = function() { //multiple behaviours at play, accumulates a bunch of behaviours
 var arrive = this.arrive(this.target);
 var mouse = createVector(mouseX,mouseY);
 var flee = this.flee(mouse);

 arrive.mult(1);
 flee.mult(5); //fleeing force is much stronger than arriving force
 
 this.applyForce(arrive);
 this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) { // f = force, add multiple forces into acceleration
this.acc.add(f);
}

Vehicle.prototype.update = function() {
this.pos.add(this.vel); //velocity changing position
this.vel.add(this.acc); //acceleration changing velocity
this.acc.mult(0); //clear acceleration
}

Vehicle.prototype.show = function() {
stroke(255);
strokeWeight(8);
point(this.pos.x, this.pos.y);
}

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos); //get a vector that points from position to target 
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) { //if distance is less than 100
  speed = map(d, 0, 100, 0, this.maxspeed); //when distance is 0, mag is 0, when distance is 100, magnitude is maxspeed
  } 
  desired.setMag(speed); //magnitude
 var steer = p5.Vector.sub(desired, this.vel); //steering force, desired speed minus velocity
 steer.limit(this.maxforce); //steering force wont be as strong
 return steer;
}


Vehicle.prototype.flee = function(target) { //THE DOTS FLEE, MOVE IN OPPOSITE DIRECTION OF MOUSE
  var desired = p5.Vector.sub(target, this.pos); //get a vector that points from position to target 
  var d = desired.mag();
  if (d < 50) {
  desired.setMag(this.maxspeed);
  desired.mult(-1); //multiply the force in teh opposite direction
 var steer = p5.Vector.sub(desired, this.vel); //steering force, desired speed minus velocity
 steer.limit(this.maxforce); //steering force wont be as strong
 return steer;
} else {
 return createVector(0,0);
 }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload() {
font = loadFont('data/Lalique.otf');
}

function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
//textFont(font);
//textSize(200);
//fill(255);
//noStroke(); 
//text('LALIQUE', 10, 450);

//instead of drawing it as text, want to get the points/vertices of the letters

var points = font.textToPoints('LALIQUE', 10, 450, 200); //last is fontsize

for (var i = 0; i < points.length; i++){
var pt = points[i];
var vehicle = new Vehicle(pt.x, pt.y);
vehicles.push(vehicle); // making a vehicle for every point
//stroke(255);
//strokeWeight(8);
//point(pt.x, pt.y);
}
}

function draw() {
background(0);
for (var i = 0; i < vehicles.length; i++) {
var v = vehicles[i];
v.behaviors();
v.update();
v.show();
//textFont(font);
//textAlign(RIGHT);
//fill(255);
//noStroke();
//textSize(20);
//text('move your mouse through the letters', 800, 215);
//textFont(font);
//text(font.textToPoints('LALIQUE', 10, 450, 20)); //last is fontsize
}
}
