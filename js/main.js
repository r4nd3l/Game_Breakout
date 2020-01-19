// selcet the canvas element
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// add border to canvas
cvs.style.border = "1px solid #0ff";

// make the line a little bit more thick
cvs.style.border = "1px solid #0ff";

// game vars and const
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3; // default lives
let leftArrow = false;
let rightArrow = false;

// create the paddle
const paddle = {
  x : cvs.width/2 - PADDLE_WIDTH/2,
  y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
  width : PADDLE_WIDTH,
  height : PADDLE_HEIGHT,
  dx : 5
}

// create the ball
const ball = {
  x : cvs.width/2,
  y : paddle.y - BALL_RADIUS,
  radius : BALL_RADIUS,
  speed : 4,
  dx : 3,
  dy : -3
}

// draw the ball
function drawBall(){
  ctx.beginPath();

  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "#ffcd05";
  ctx.fill();

  ctx.strokeStyle = "#2e3548";
  ctx.stroke();

  ctx.closePath();
}

// move the ball
function moveBall(){
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// draw paddle
function drawPaddle(){
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.strokeStyle = "#ffcd05";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// controll the paddle
document.addEventListener("keydown", function(event){
  if(event.keyCode == 37){
    leftArrow = true;
  }else if(event.keyCode == 39){
    rightArrow = true;
  }
});
document.addEventListener("keyup", function(event){
  if(event.keyCode == 37){
    leftArrow = false;
  }else if(event.keyCode == 39){
    rightArrow = false;
  }
});

// move paddle
function movePaddle(){
  if(rightArrow && paddle.x + paddle.width < cvs.width){
    paddle.x += paddle.dx;
  }else if(leftArrow && paddle.x > 0){
    paddle.x -= paddle.dx;
  }
}
// ball and wall collision detection
function ballWallCollision(){
  if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
    ball.dx = - ball.dx;
  }

  if(ball.y - ball.radius < 0){
    ball.dy = - ball.dy;
  }

  if(ball.y + ball.radius > cvs.height){
    LIFE--; // lose life
    resetBall();
  }
}

// reset the ball
function resetBall(){
  ball.x = cvs.width/2;
  ball.y = paddle.y - BALL_RADIUS;
  ball.dx = 3;
  ball.dy = -3;
}

// draw function
function draw(){
  drawPaddle();
  drawBall();
}

// update game function
function update(){
  movePaddle();
  moveBall();
  ballWallCollision();
}

// game loop
function loop(){
  // clear the canvas
  ctx.drawImage(BG_IMG, 0, 0);

  draw();

  update();

  requestAnimationFrame(loop);
}
loop();

























// END
