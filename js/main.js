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
  if(rightArrow){
    paddle.x += paddle.dx;
  }else if(leftArrow){
    paddle.x -= paddle.dx;
  }
}

// draw function
function draw(){
  drawPaddle();
}

// update game function
function update(){
  movePaddle();
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
