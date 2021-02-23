function Paddle(x,y) {
  this.xPos = x;
  this.yPos = y;
}

Paddle.prototype.restart = function(x,y){
  this.xPos = x;
  this.yPos = y;
};

//BALL_DIAMETER = 20; BALL_DIAMETER = 20;PADDLE1_SPEED = 20; ??
//move up 20 px, except if it's under 20 to origin (x,y)=(0,0)
Paddle.prototype.moveUp = function(){
  this.yPos = (this.yPos - 20 < 0) ? 0 : this.yPos - 20;
  return this.yPos;
};

//PADDLE_HEIGHT = 100;BOARD_HEIGHT = 500;
//move down 20 px, except if lower part of paddle is under 20 to y limit (x,y)=(0,500)
Paddle.prototype.moveDown = function(){
  this.yPos = (this.yPos +12 > game.BOARD_HEIGHT - game.PADDLE_HEIGHT) ?
    game.BOARD_HEIGHT - game.PADDLE_HEIGHT : this.yPos + 20;
    return this.yPos;
};

Paddle.prototype.hitBall = function(ball){

  var ballTop = game.board.ball.yPos; //considerando que la coordenada de referencia es arriba izqu
  var ballBottom = game.board.ball.yPos + game.BALL_DIAMETER;
  var ballLeft = game.board.ball.xPos;
  var ballRight = game.board.ball.xPos + game.BALL_DIAMETER;
  var padTop = this.yPos;
  var padBottom = this.yPos + game.PADDLE_HEIGHT;
  var padLeft = this.xPos;
  var padRight = this.xPos + game.PADDLE_WIDTH;

  // check x collision
  if (ballLeft <= padRight && ballLeft >= padLeft ||
      ballRight >= padLeft && ballRight <= padRight){
      // we are withiin a pads width, now check height
      if (ballTop >= padTop && ballTop <= padBottom ||
          ballBottom <= padBottom && ballBottom >= padTop){
            // we got a hit!
            console.log("HIT",  this);
            return true;
      }
      return false;
  }
  return false;
};
