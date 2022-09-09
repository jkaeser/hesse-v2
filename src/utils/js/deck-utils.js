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
    this.games = games;
  }

  get gamesPlayed() {
    return this.games.games.length;
  }

  get wins() {
    return this.games.wins;
  }

  get losses() {
    return this.games.losses;
  }

  get winLossRatio() {
    return this.games.winLossRatio;
  }

  get latestGame() {
    return this.games.latestGame;
  }

  get streak() {
    return this.games.getStreak();
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
          new Games(games.filter(game => game.deck.id === deck.id)))
      });
    this.games = games;
  }

  sortByGamesPlayed() {
    this.decks = this.decks.sort((a, b) => {
      return b.gamesPlayed - a.gamesPlayed;
    });
  }

  sortByAlphabetical() {
    this.decks = this.decks.sort((a, b) => {
      return a.commander >= b.commander ? 1 : -1;
    });
  }
}
