
  function Game(){
    this.PADDLE1_SPEED = 20;
    this.PADDLE2_SPEED = 4;
    this.BOARD_HEIGHT = 500; // should keep track of styles values
    this.BOARD_WIDTH = 900; // should keep track of styles values
    this.PADDLE_HEIGHT = 100; // should keep track of styles values
    this.PADDLE_WIDTH = 20;
    this.BALL_DIAMETER = 20; // ''
    this.INTERVAL_TIME = 50;

    this.interval;

    this.board = new Board();

    this.startGame = function(){
      var that=this;
      $('#start').on('click', function(){
        //that.activatePaddle2();
        that.assignControlsToKeys();

        that.renderGame();
        that.board.start();
        //that.updateState();
        that.interval = setInterval(that.updateState, that.INTERVAL_TIME);
      });
    }
  }


//change ball position, change paddle2 positions.
//then call renderGame
Game.prototype.updateState=function(){

    game.activatePaddle2(game.board.ball.xPos, game.board.ball.yPos);

    //  update ball position;
    game.board.ball.move();

    // then check if someone scored.
    if (game.board.ball.pointScored() && game.board.ball.winner()){
      var winner = game.board.ball.winner();
      if (winner === game.board.paddle1){
        game.board.homeScore += 1;
      } else {
        game.board.awayScore += 1;
      }

      game.board.restart();
    }

    // check if game is over?
         //render score before this?

    if (game.board.gameOver()) {
      game.board.stop(this.game);
    }

    //render all
    //paddle1, paddle2, ball, score   --- Maybe we shouldn't render paddle1 twice...
    game.renderGame();
}

Game.prototype.assignControlsToKeys = function(){

  $('body').on('keydown', function(e){
    //change paddle1 positions. update coordinates for paddle1 here. Also render it!
    var key = e.which;  //key38 is up, key 40 is down
    var paddle1 = game.board.paddle1;

    if (key === 38){
      e.preventDefault();
      //move paddle1 up
      paddle1.yPos = paddle1.moveUp();
      //paddle1.yPos = (paddle1.yPos - 20 < 0) ? 0 : paddle1.yPos - 20;
    } else if (key === 40){
      e.preventDefault();
      //move paddle1 down
      paddle1.yPos = paddle1.moveDown();
      //paddle1.yPos = (paddle1.yPos + 20 > BOARD_HEIGHT - PADDLE_HEIGHT) ?
      //  BOARD_HEIGHT - PADDLE_HEIGHT : paddle1.yPos + 20;
    }

    //render paddle
    $('#paddle1').css('top', game.board.paddle1.yPos);
  });
};



  Game.prototype.activatePaddle2 = function(x, y) {

    if (y + this.BALL_DIAMETER/2 > this.board.paddle2.yPos + this.PADDLE_HEIGHT/2){
      //paddle2 must go down
      this.board.paddle2.yPos = (this.board.paddle2.yPos + this.PADDLE2_SPEED >= this.BOARD_HEIGHT - this.PADDLE_HEIGHT) ?
      this.BOARD_HEIGHT - this.PADDLE_HEIGHT : this.board.paddle2.yPos + this.PADDLE2_SPEED;

    } else {
      //paddle2 must go up
      this.board.paddle2.yPos = (this.board.paddle2.yPos - this.PADDLE2_SPEED < 0) ?
        0 : this.board.paddle2.yPos - this.PADDLE2_SPEED;
    }
}


Game.prototype.renderGame = function (){
  this.renderScore();
  this.renderPaddle();
  this.renderBall();
}

Game.prototype.renderScore = function(){
  var homeScoreSpan = $('#home-score');
  var awayScoreSpan = $('#away-score');
  homeScoreSpan.html(game.board.homeScore);
  awayScoreSpan.html(game.board.awayScore);
}

Game.prototype.renderBall = function(){
  var ballDiv = $('#ball');
  ballDiv.css('left', game.board.ball.xPos + 'px');
  ballDiv.css('top', game.board.ball.yPos + 'px');
}

Game.prototype.renderPaddle = function(){
  var paddle2Div = $('#paddle2');
  paddle2Div.css('left', game.board.paddle2.xPos + 'px');
  paddle2Div.css('top', game.board.paddle2.yPos + 'px');
}

var game = new Game();
game.startGame();
