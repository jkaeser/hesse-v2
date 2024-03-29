import { Games } from "./game-utils"

export class Deck {
  constructor(id, colors, commander, type, links, status, owner, games) {
    this.id = id;
    this.colors = colors;
    this.commander = commander;
    this.type = type;
    this.links = links;
    this.status = status;
    this.owner = {
      ...owner,
      nameFull: `${owner?.nameFirst} ${owner?.nameLast}`
    };
    this.Games = games;
  }

  /**
   * @returns {string}
   */
  get nameWithOwner() {
    return `${this.commander} (${this.owner.nameFull})`;
  }

  /**
   * @returns {number}
   */
  get gamesPlayed() {
    return this.Games.games.length;
  }

  /**
   * @returns {Array}
   *   An array of game nodes.
   */
  get wins() {
    return this.Games.games.filter(game => game.winner.id === this.id);
  }

  /**
   * @returns {Array}
   *   An array of game nodes.
   */
  get losses() {
    return this.Games.games.filter(game => game.winner.id !== this.id);
  }

  /**
   * @returns {number}
   */
  get winLossRatio() {
    const ratio = Number(this.wins.length / (this.losses.length > 0 ? this.losses.length : 1));
    return ratio < 1 ? ratio.toPrecision(2) : ratio.toPrecision(3);
  }

  /**
   * @returns {Object}
   *   A game node.
   */
  get latestGame() {
    return this.Games.latestGame;
  }

  /**
   * @returns {Array}
   *   An array of game nodes.
   */
  get streak() {
    return this.getStreak();
  }

  /**
   * @param {number} iterator
   *   A counter used to make this method recursive.
   * @returns {Object}
   *   A object that describes the streak.
   */
  getStreak(iterator = 0, type = false) {
    const { games } = this.Games;
    if (games.length <= 0) {
      return { count: null, type: null };
    }
    if (games[iterator + 1]) {
      let game1Won = games[iterator].winner.id === this.id;
      let game2Won = games[iterator + 1].winner.id === this.id;

      if (game1Won === game2Won) {
        iterator++;
        return this.getStreak(iterator, game1Won);
      }
    }
    return {
      count: iterator === 0 ? null : iterator + 1,
      type: iterator === 0 ? null : type ? 'win' : 'loss',
    };
  }
}

export class Decks {
  constructor(decks, games) {
    this.decks = decks
      .sort((a, b) => ( a.commander >= b.commander ? 1 : -1))
      .map(deck => {
        return new Deck(
          deck.id,
          deck.colors,
          deck.commander,
          deck.type,
          deck.links,
          deck.status,
          deck.owner,
          new Games(games.filter(game => {
            const deckIds = game.decks.filter(deckInGame => deckInGame).map(deckInGame => deckInGame.id);
            return deckIds.includes(deck.id);
          }), deck.id))
      });
    this.games = games;
  }

  sortByAlphabetical() {
    this.decks = this.decks.sort((a, b) => {
      return a.commander >= b.commander ? 1 : -1;
    });
  }

  sortByGamesPlayed() {
    this.decks = this.decks.sort((a, b) => {
      return b.gamesPlayed - a.gamesPlayed;
    });
  }

  sortByWinLossRatio() {
    this.decks = this.decks.sort((a, b) => {
      return b.winLossRatio >= a.winLossRatio ? 1 : -1;
    });
  }

  /**
   * @returns {Object}
   *   An object full of game nodes keyed by deck color.
   */
  get winsByColor() {
    const winsByColor = this.decks.map(deck => {
      return new Games(deck.Games.games.filter(game => game.winner.id === deck.id)).winsByColor;
    });
    let mergedWins = {};
    winsByColor.forEach(byColor => {
      Object.keys(byColor).forEach(color => {
        if (!mergedWins.hasOwnProperty(color)) {
          mergedWins[color] = [];
        }
        mergedWins[color] = [...mergedWins[color], ...byColor[color]];
      })
    });
    return mergedWins;
  }

  get winPercentagesByColor() {
    const { winsByColor } = this;
    const winPercentages = [];

    Object.keys(winsByColor).forEach(color => {
      winPercentages.push({
        color: color,
        percentage: winsByColor[color].length / this.games.length,
      });
    });

    return winPercentages;
  }
}
