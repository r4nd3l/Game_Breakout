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

let SCORE = 0;
const SCORE_UNIT = 10;

let LEVEL = 1;
const MAX_LEVEL = 3;

let GAME_OVER = false;

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
    WALL_HIT.play();
  }

  if(ball.y - ball.radius < 0){
    ball.dy = - ball.dy;
    WALL_HIT.play();
  }

  if(ball.y + ball.radius > cvs.height){
    LIFE--; // lose life
    LIFE_LOST.play();
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

     // plas sound
     PADDLE_HIT.play();

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
  row : 1,
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

// ball bricks collision
function ballBrickCollision(){
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
      let b = bricks[r][c];
      // if the bricks are not broken
      if(b.status){
        if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
          BRICK_HIT.play();
          ball.dy = - ball.dy;
          b.status = false; // the brick is broken
          SCORE += SCORE_UNIT;
        }
      }
    }
  }
}

// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY){
  // draw text
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Arial";
  ctx.fillText(text, textX, textY);

  // draw image
  ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

// draw function
function draw(){
  drawPaddle();
  drawBall();
  drawBricks();

  // show score
  showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5)

  // show lives
  showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width - 55, 5)

  // show levels
  showGameStats(LEVEL, cvs.width/2, 25, LEVEL_IMG, cvs.width/2 - 30, 5)
}

// game over
function gameOver(){
  if(LIFE <= 0){
    showYouLose();
    GAME_OVER = true;
  }
}

// level up
function levelUp(){
  let isLevelDone = true;

  // check if all the bricks are broken
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
      isLevelDone = isLevelDone && ! bricks[r][c].status;
    }
  }
  if(isLevelDone){
    WIN.play();
    if(LEVEL >= MAX_LEVEL){
      showYouWin();
      GAME_OVER = true;
      return;
    }
    brick.row++;
    createBricks();
    ball.speed += 0.5;
    resetBall();
    LEVEL++;
  }
}

// update game function
function update(){
  movePaddle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
  ballBrickCollision();
  gameOver();
  levelUp();
}

// game loop
function loop(){
  // clear the canvas
  ctx.drawImage(BG_IMG, 0, 0);

  draw();

  update();

  if(! GAME_OVER){
    requestAnimationFrame(loop);
  }
}
loop();

// select sound effect
const soundElement = document.getElementById("sound");

soundElement.addEventListener("click", soundSwitch);

function soundSwitch(){
  // change image sound_on/off
  let imgSrc = soundElement.getAttribute("src");
  let SOUND_IMG = imgSrc == "img/sound_on.svg" ? "img/sound_off.svg" : "img/sound_on.svg";

  soundElement.setAttribute("src", SOUND_IMG);

  // mute and unmuted the sounds
  WALL_HIT.muted = WALL_HIT.muted ? false : true;
  PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
  BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
  WIN.muted = WIN.muted ? false : true;
  LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
}

// game over message
const gameover = document.getElementById("gameover");
const youwon = document.getElementById("youWin");
const youlose = document.getElementById("youLose");
const restart = document.getElementById("restart");

// click on play again button
restart.addEventListener("click", function(){
  location.reload(); // reload the page
});

// win
function showYouWin(){
  gameover.style.display = "block";
  youwon.style.display = "block";
}

// lose
function showYouLose(){
  gameover.style.display = "block";
  youlose.style.display = "block";
}


















// END
