export class Games {
  constructor(games) {
    this.games = games.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * @param {array} games
   *   An array of game nodes.
   */
  setGames(games) {
    this.games = games;
  }

  /**
   * @returns {array}
   *   An array of game nodes.
   */
  get wins() {
    return this.games.filter(game => game.result === 'win');
  }

  /**
   * @returns {array}
   *   An array of game nodes.
   */
  get losses() {
    return this.games.filter(game => game.result === 'loss');
  }

  /**
   * @returns {number}
   */
  get winLossRatio() {
    const ratio = Number(this.wins.length/(this.losses.length > 0 ? this.losses.length : 1));
    return ratio < 1 ? ratio.toPrecision(2) : ratio.toPrecision(3);
  }

  /**
   * @returns {array}
   *   An array of numbers.
   */
  get playerCounts() {
    return this.games
      .map(game => game.opponents.length)
      .reduce((playerCounts, count) => {
        const countWithPlayer = count + 1;
        if (count !== 0 && playerCounts.indexOf(countWithPlayer) === -1) {
          playerCounts.push(countWithPlayer);
        }
        return playerCounts.sort((a, b) => b - a);
      }, []);
  }

  /**
   * @returns {array}
   *   An array of strings.
   */
  get playerCommanders() {
    return this.games
      .map(game => game.deck.commander)
      .reduce((commanders, commander) => {
        if (commanders.indexOf(commander) === -1) {
          commanders.push(commander);
        }
        return commanders;
      }, []);
  }

  /**
   * @returns {array}
   *   An array of deck nodes.
   */
  get opponentDecks() {
    return Object.values(this.games
      .reduce((opponents, game) => {
        game.opponents.forEach(opponent => {
          if (Object.keys(opponents).indexOf(opponent.id) === -1) {
            opponents[opponent.id] = opponent;
          }
        });
        return opponents;
      }, {})
    );
  }

  /**
   * @returns {object}
   *   An object with keys containing arrays of game nodes.
   */
  get gamesByColor() {
    return this.games.reduce((byColor, game) => {
      game.deck.colors.forEach(color => {
        byColor[color].push(game);
      });
      return byColor;
    }, {white: [], blue: [], black: [], red: [], green: []});
  }

  /**
   * @returns {object}
   *   An object with keys containing arrays of game nodes.
   */
  get gamesByMonth() {
    return this.games.reduce((byMonth, game) => {
      const date = new Date(game.date);
      // Setting to the middle of the month helps avoid time zone issues.
      const dateKey = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-15`;
      if (!byMonth.hasOwnProperty(dateKey)) {
        byMonth[dateKey] = [];
      }
      byMonth[dateKey].push(game);
      return byMonth;
    }, {});
  }

  /**
   * @returns {object}
   *   A game node.
   */
  get latestGame() {
    return this.games.length > 0 ? this.games[0] : null;
  }

  /**
   * @param {string} result
   *   'win' or 'loss'.
   * @returns {array}
   *   An array containing objects that describe the number of results in each
   *   month.
   */
  getResultsCountByMonth(result = 'win') {
    const resultsByMonth = [];
    Object.entries(this.gamesByMonth).forEach(([month, games]) => {
      resultsByMonth.push({
        month: new Date(month),
        count: games.filter(game => game.result === result).length
      });
    });
    return resultsByMonth.sort((a, b) => a.month - b.month);
  }

  /**
   * @param {number} iterator
   *   A counter used to make this method recursive.
   * @returns {number}
   *   A number describing the length of the streak.
   */
  getStreakCount(iterator = 0) {
    if (this.games.length <= 0 ) {
      return null;
    }
    if (this.games[iterator + 1]) {
      let game1 = this.games[iterator];
      let game2 = this.games[iterator + 1];

      if (game1.result === game2.result) {
        iterator++;
        return this.getStreakCount(iterator);
      }
    }
    return iterator === 0 ? null : iterator + 1;
  }

  /**
   * @returns {string}
   *  A string describing the streak.
   */
  getStreakType() {
    if (this.games.length <= 0 ) {
      return null;
    }
    let streak = null;
    if (this.games[0].result === this.games[1].result) {
      switch(this.games[0].result) {
        case 'win':
          streak = 'winning';
          break;
        case 'loss':
          streak = 'losing'
          break;
        default:
          break;
      }
    }
    return streak;
  }
}
