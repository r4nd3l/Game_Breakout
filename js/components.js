// load background img
const BG_IMG = new Image();
BG_IMG.src = "img/bg.png";

// load level img
const LEVEL_IMG = new Image();
LEVEL_IMG.src = "img/level.svg";
LEVEL_IMG.src.width = 128;
LEVEL_IMG.src.height = 128;

// load life img
const LIFE_IMG = new Image();
LIFE_IMG.src = "img/life.svg";
LIFE_IMG.src.width = 128;
LIFE_IMG.src.height = 128;


// load score img
const SCORE_IMG = new Image();
SCORE_IMG.src = "img/score.svg";
SCORE_IMG.src.width = 128;
SCORE_IMG.src.height = 128;

// ball hit the wall
const WALL_HIT = new Audio();
WALL_HIT.src = "sfx/wallHit.mp3";
WALL_HIT.volume = 0.1;

// ball hit the wall
const LIFE_LOST = new Audio();
LIFE_LOST.src = "sfx/ballBuzz.mp3";
LIFE_LOST.volume = 0.1;

// ball hit the wall
const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "sfx/paddleHit.mp3";
PADDLE_HIT.volume = 0.1;

// ball hit the wall
const WIN = new Audio();
WIN.src = "sfx/win.mp3";
WIN.volume = 0.1;

// ball hit the wall
const BRICK_HIT = new Audio();
BRICK_HIT.src = "sfx/brickHit.mp3";
BRICK_HIT.volume = 0.1;


