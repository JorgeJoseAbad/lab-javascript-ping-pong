function Paddle(x,y) {
  this.xPos = x;
  this.yPos = y;
}

Paddle.prototype.restart = function(x,y){
  this.xPos = x;
 this.yPos = y;
};

Paddle.prototype.moveUp = function(){
  this.yPos = (this.yPos - 20 < 0) ? 0 : this.yPos - 20;
};

Paddle.prototype.moveDown = function(){
  this.yPos = (this.yPos + 20 > BOARD_HEIGHT - PADDLE_HEIGHT) ?
    BOARD_HEIGHT - PADDLE_HEIGHT : this.yPos + 20;
};

Paddle.prototype.hitBall = function(ball){

  var ballTop = ball.yPos; //considerando que la coordenada de referencia es arriba izqu
  var ballBottom = ball.yPos + BALL_DIAMETER;
  var ballLeft = ball.xPos;
  var ballRight = ball.xPos + BALL_DIAMETER;
  var padTop = this.yPos;
  var padBottom = this.yPos + PADDLE_HEIGHT;
  var padLeft = this.xPos;
  var padRight = this.xPos + PADDLE_WIDTH;

  // check x collision
  if (ballLeft <= padRight && ballLeft >= padLeft ||
      ballRight >= padLeft && ballRight <= padRight){
      // we are withiin a pads width, now check height
      if (ballBottom >= padTop && ballBottom <= padBottom ||
          ballTop <= padBottom && ballTop >= padTop){
            // we got a hit!
            console.log("HIT" + this);
            return true;
      }
      return false;
  }
  return false;
};
