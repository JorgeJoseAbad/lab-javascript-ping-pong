function Board() {

  this.paddle1 = new Paddle(0, 200, "paddle1");
  this.paddle2 = new Paddle(990, 200, "paddle2");
  this.ball    = new Ball(490, 280, this.paddle1, this.paddle2);
  this.homeScore = 0;
  this.awayScore = 0;
}

//set score to 0-0, put everyone in initial places,
//assign speed functions
Board.prototype.start = function(){
  this.ball.randomDirection();
};

Board.prototype.checkGame = function(){
  //quedo sin funcionalidad
};

//stop
Board.prototype.stop = function(game){
  //probably should render atleast the score here as I'm not rendering anything
  //after we find game is over.
  debugger;
  clearInterval(game.interval);
  alert("game is stopped");
 };

Board.prototype.restart = function(){
  this.ball.restart();
  this.paddle1.restart(0, 200);
  this.paddle2.restart(990, 200);
};

Board.prototype.gameOver = function(){
  if (this.homeScore !== 7 && this.awayScore !== 7) return false;
  else if (this.homeScore === 7) return this.paddle1.name;
  else if (this.awayScore === 7) return this.paddle2.name;
};
