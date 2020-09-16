let pos;
let velocity;
let score;
let time;
let size;
let started;
let startedTime;
let scorePercent;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  pos = [width / 2, height / 2];
  velocity = [0, 1];
  score = 0;
  time = 0;
  size = 150;
  started = false;
  startedTime = 0;
  scorePercent = 0;
  textAlign(CENTER);
  circle(pos[0], pos[1], size);
  text("Click to start!", width / 2, height / 2);
}

function draw() {
  if (!started) return;
  background(220);
  circle(pos[0], pos[1], size);
  pos[0] += velocity[1] * Math.sin(velocity[0]);
  pos[1] += -velocity[1] * Math.cos(velocity[0]);
  velocity[0] += random() - 0.5;
  // velocity[0] += 0.1;
  velocity[1] += 0.005;
  if (pos[0] > width - size / 2) {
    // pos[0] = width;
    velocity[0] = -PI / 2;
  }
  if (pos[0] < 0 + size / 2) {
    // pos[0] = 0;
    velocity[0] = PI / 2;
  }
  if (pos[1] > height - size / 2) {
    // pos[1] = width;
    velocity[0] = 0;
  }
  if (pos[1] < 0 + size / 2) {
    // pos[1] = 0;
    velocity[0] = PI;
  }
  if (dist(mouseX, mouseY, pos[0], pos[1]) <= size) score++;
  time++;
  scorePercent = Math.round((score / time) * 100, 2);
  textAlign(LEFT);
  text(scorePercent + "% Accuracy", 10, 20);
  if (size > 50) size -= 0.05;
  if (scorePercent < 81) {
    started = false;
    textAlign(CENTER);
    let finishTime = (millis() - startedTime) / 10;
    finishTime = Math.round(finishTime) / 100;
    text(`You lasted ${finishTime} seconds`, width / 2, height / 2);
    setTimeout(() => {
      setup();
    }, 2000);
  }
}

function mousePressed() {
  if (started) return;
  started = true;
  startedTime = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
