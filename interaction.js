//create array for circle
let circle = [];

//setup canvas with extended window
function setup() {
  createCanvas(windowWidth, windowHeight);
}

////mouse click functionality
//mousePressed function referenced from Arrays of Objects Tutorial (https://www.youtube.com/watch?v=fBqaA7zRO58&ab_channel=TheCodingTrain)
function mousePressed() {
  let s = new colorCircle(mouseX, mouseY);
  circle.push(s);
}

//setup draw with for loop with ohject array
function draw() {
  background(0);
  for (let i = 0; i < circle.length; i++) {
    circle[i].move();
    circle[i].show();

    //create additional for loop with conditional for when object intersects, the paramters change
    //referenced from Checking Objects Intersection Tutorial(https://www.youtube.com/watch?v=GY-c2HO2liA)
    for (let j = 0; j < circle.length; j++) {
      if (i !== j && circle[i].intersects(circle[j])) {
        circle[i].changeParameters();
        circle[j].changeParameters();
      }
    }
  }
}

//create a class for circles
class colorCircle {
  //constructor parameters to initialize the what the circle looks like
  constructor(_x, _y) {
    //maybe size and speed go here
    this.x = _x;
    this.y = _y;
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.size = random(25, 50);
  }
  //move paramater to showcase the object moving, could also put in the boundary for it to stay inside the window
  move() {
    //make it move randomly
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    //make it so that it stays in the window
    //referenced from bounce p5.js documentation(https://p5js.org/examples/motion-bounce.html)
    if (this.x > width - this.size || this.x < this.size) {
      this.xSpeed *= -1;
    }
    if (this.y > height - this.size || this.y < this.size) {
      this.ySpeed *= -1;
    }
  }
  //show parameter where the object is created
  show() {
    stroke(this.r, this.g, this.b);
    strokeWeight(5);
    ellipse(this.x, this.y, this.size * 2, this.size * 2);
    fill(this.r, this.g, this.b);
  }

  //intersection collision information
  //referenced from Object Communication Tutorial (https://www.youtube.com/watch?v=W1-ej3Wu5zg&t=2s)
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.size + other.size;
  }

  //change in parameters when intersection collision occurs including color,size,speed, and direction
  changeParameters() {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
    this.size = random(25, 50);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
