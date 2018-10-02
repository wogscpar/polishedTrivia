const Should = require('should');
const Game = require('./game.js');

describe("The test environment", function () {
  it("should pass", function () {
    (true).should.equal(true);
  });

  it("should access game", function () {
    Should(Game).not.equal(undefined);
  });
});

describe("Your spec..", function () {
  const gameCategories = ['Pop', 'Science', 'Sports', 'Rock'];
  it("Should not be playable", function () {
    const game = new Game(gameCategories);
    (game.isPlayable()).should.equal(false);

    game.add('Chet');
    (game.isPlayable()).should.equal(false);
  });

  it("Should have added players and be playable", function () {
    const game = new Game(gameCategories);
    game.add('Chet');
    game.add('Pat');
    game.add('Sue');

    (game.isPlayable()).should.equal(true);
    (game.currentPlayer()).should.equal('Chet');
  });

  it("Should have moved to next player", function () {
    const game = new Game(gameCategories);
    game.add('Chet');
    game.add('Pat');
    game.add('Sue');

    (game.isPlayable()).should.equal(true);
    (game.currentPlayer()).should.equal('Chet');

    game.roll(Math.floor(Math.random() * 6) + 1);
    (game.currentPlayer()).should.equal('Pat');
  });
});
