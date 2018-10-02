const Questions = require('./question.js');

class Game {
  constructor(questionCategories) {
	this.players = {};
	this.playQueue = [];

	this.questions = new Questions(questionCategories);
  }

  isPlayable() {
  	return this.playQueue.length >= 2;
  }

  howManyPlayers() {
  	return this.players.length;
  }

  currentPlayer() {
  	return this.playQueue[0];
  }

  add(name) {
  	if (name in this.players) {
	  Console.log("Name already taken...");
	  return false;
	} else {
		this.playQueue.push(name);
		this.players[name] = {
			place: 0,
			purse: 0,
			inPenalty: false
		};
		return true;
	}
  }

  play(place) {
	var category = 'Rock';
	if (place == 0 | place == 4 | place == 8) 
		category = 'Pop';
	if (place == 1 | place == 5 | place == 9)
		category = 'Science';
	if (place == 2 | place == 6 | place == 10)
	  	category = 'Sports';

  	return this.questions.askQuestion(category);
  }

  doPlay(currentPlayer, roll) {
	var place = this.players[currentPlayer].place;

	place += roll
	place = (place > 11 ) ? place - 12 : place;

	this.players[currentPlayer].place = place;
	this.play(place);
  }

  roll(roll) {
	var currentPlayer = this.playQueue.shift();
	
	if (this.players[currentPlayer].inPenalty) {
		if (roll % 2 != 0) {
			this.players[currentPlayer].inPenalty = false;
			this.doPlay(currentPlayer, roll);
		} else {
			this.players[currentPlayer].inPenalty = true;
		}
	} else {
		this.doPlay(currentPlayer, roll);
	}

	this.playQueue.push(currentPlayer);
	return currentPlayer;
  }

  playerHasWon(player) {
  	return !(this.players[player].purse == 6);
  }

  answerCorrect(player) {
    if (!this.players[player].inPenalty) {
    	this.players[player].purse += 1;

	console.log('Correct answer!');
	console.log(`Player: ${player} with current purse:  ${this.players[player].purse}`);
    }
  }
  answerWrong(player) {
	this.players[player].inPenalty = true;
  }
}

var gameCategories = ['Pop', 'Science','Sports','Rock'];
var game = new Game(gameCategories);

game.add('Chet');
game.add('Pat');
game.add('Sue');
var playerThatRolled = '';
do {
	playerThatRolled = game.roll(Math.floor(Math.random() * 6) + 1);

	if (Math.floor(Math.random() *10) == 7) {
		game.answerWrong(playerThatRolled);
	} else {
		game.answerCorrect(playerThatRolled);
	}
} while (game.playerHasWon(playerThatRolled));

module.exports = Game;
