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
  dx : 3 * (Math.random() * 2 - 1),
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
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}

// ball and paddle collison
function ballPaddleCollision(){
   if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){

     // check where the ball hit the paddle
     let collidePoint = ball.x - (paddle.x + paddle.width/2);

     // normalize the values
     collidePoint = collidePoint / (paddle.width/2);

     // claculate the angle of the ball
     let angle = collidePoint * Math.PI/3;

     ball.dx = ball.speed * Math.sin(angle);
     ball.dy = - ball.speed * Math.cos(angle);
   }
}

// create the bricks
const brick = {
  row : 3,
  column : 5,
  width : 55,
  height : 20,
  offSetLeft : 20,
  offSetTop : 20,
  marginTop : 40,
  fillColor : "#2e3548",
  strokeColor : "#fff"
}

let bricks = [];

function createBricks(){
  for(let r = 0; r < brick.row; r++){
    bricks[r] = [];
    for(let c = 0; c < brick.column; c++){
      bricks[r][c] = {
        x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
        status : true
      }
    }
  }
}

createBricks();

// draw the bricks
function drawBricks(){
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
      let b = bricks[r][c];
      // if the bricks are not broken
      if(b.status){
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(b.x, b.y, brick.width, brick.height);

        ctx.strokeStyle = brick.strokeColor;
        ctx.strokeRect(b.x, b.y, brick.width, brick.height);
      }
    }
  }
}

// draw function
function draw(){
  drawPaddle();
  drawBall();
  drawBricks();
}

// update game function
function update(){
  movePaddle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
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
