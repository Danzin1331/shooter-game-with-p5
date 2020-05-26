let enemy;
let score = 0;
let isGoing = true;
let boom;

function preload() {
  boom = loadSound("assets/boom.wav");
  pip = loadSound("assets/pip.wav");
}

function setup() {
  createCanvas(600, 600);

  pip.play();
  
  enemy = {
      x: width / 2,
      y: height / 2,
      d: 50,
      speed: 1,
  
      start: function() {
        this.x = floor(random() * 400);
        this.y = height;
        this.d = floor(random() * 60);
        this.d = map(this.d, 0, 60, 40, 60);
        this.increaseSpeed(0.1);
      },

      increaseSpeed: function(amount) {
        this.speed += amount;
      },

      show: function() {
          this.y -= this.speed;
          ellipse(this.x, this.y, this.d, this.d);
      },

      detect: function(pointx, pointy) {
        let r = this.d / 2;
        if(dist(this.x, this.y, pointx, pointy) < r)
        {
          return true;
        }
        else
        {
          return false;
        }
      },

      end: function() {
        if(this.y <= 0)
        {
          isGoing = false;
          fill(255);
          textSize(60);
          textAlign("center");
          text("Your score was: " + score, width / 2, height / 2);
        }
      }
  }

  enemy.start();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  
  if(isGoing) {
    fill(0);
    enemy.show();
    
    fill(255);
    textSize(30);
    text(score, width - 45, 50);

    noFill();
    rectMode("center")
    ellipse(mouseX, mouseY, 50, 50);
    line(mouseX, height, mouseX, mouseY)
    line(mouseX, 0, mouseX, mouseY)
    line(width, mouseY, mouseX, mouseY)
    line(0, mouseY, mouseX, mouseY)
  }
  enemy.end();
}

function mousePressed() {
  if(isGoing)
  {
    boom.setVolume(0.3);
    boom.play();
    if(enemy.detect(mouseX, mouseY))
    {
      enemy.start();
      score++;
    }
  }
}