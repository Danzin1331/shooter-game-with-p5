let enemy;
let score = 0;
let isGoing = true;
let lives = 3;
let pip;
let boom;

// Loads in the sounds
function preload() {
  boom = loadSound("assets/boom.wav");
  pip = loadSound("assets/pip.wav");
}

function setup() {
  createCanvas(1280, 720);

  // Plays starting noise
  pip.play();
  
  // Creates enemy object
  enemy = {
      x: width / 2,
      y: height / 2,
      d: 50,
      speed: 1,
  
      start: function() {
        this.x = floor(random() * width);
        this.y = height;
        this.d = floor(random() * 100);
        this.d = map(this.d, 0, 100, 50, 70);
        this.increaseSpeed(0.2);
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
        if(this.y <= 0 && lives <= 1)
        {
          isGoing = false;
          fill(255);
          textSize(60);
          textAlign("center");
          text("Your score was: " + score, width / 2, height / 2);
        } else if(this.y <= 0) {
          boom.play();
          lives--;
          this.start();
        }
      }
  }
  
  //Starts first enemy
  enemy.start();
}

function renderHUD() {
  // Creates "Scope"
  rectMode("center")
  ellipse(mouseX, mouseY, 30, 30);
  line(mouseX, height, mouseX, mouseY)
  line(mouseX, 0, mouseX, mouseY)
  line(width, mouseY, mouseX, mouseY)
  line(0, mouseY, mouseX, mouseY)

  //Displays your score on the screen
  fill(255);
  textSize(25);
  text(score, width - 45, 50);

  //Displays your lives on the screen
  fill(255);
  textSize(25);
  for(let i = 0; i < lives; i++) {
    text("♥", 45 + i*20, 50);
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(3);
  
  if(isGoing) {
    fill(0);
    // Starts enemy
    enemy.show();

    noFill();

    renderHUD();
  }
  enemy.end();
}


//Detects mouse and plays sound when hit something
function mousePressed() {
  if(isGoing)
  {
    boom.setVolume(0.3);
    if(enemy.detect(mouseX, mouseY))
    {
      boom.play();
      enemy.start();
      score++;
    } else {
      pip.play();
    }
  }
}