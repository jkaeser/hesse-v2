export class Games {
  constructor(games) {
    this.games = games.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * @param {Array} games
   *   An array of game nodes.
   */
  setGames(games) {
    this.games = games;
  }

  /**
   * @returns {Array}
   *   An array of game nodes.
   */
  get wins() {
    return this.games.filter(game => game.result === 'win');
  }

  /**
   * @returns {Array}
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
   * @returns {Array}
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
   * @returns {Array}
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
   * @returns {Object}
   *   An object containing arrays of game nodes keyed by color.
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
   * @returns {Object}
   *   An object containing arrays of game nodes keyed by date.
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
   * @returns {Object}
   *   A game node.
   */
  get latestGame() {
    return this.games.length > 0 ? this.games[0] : null;
  }

  /**
   * @returns {Array}
   */
  get winPercentagesByColor() {
    const winPercentages = [];
    Object.entries(this.gamesByColor).forEach(entry => {
      const [color, games] = entry;
      const wins = games.filter(game => game.result === 'win');
      winPercentages.push({
        color: color,
        percentage: wins.length / games.length
      })
    });

    return winPercentages;
  }

  /**
   * @param {string} result
   *   'all', 'win', 'loss'.
   * @returns {Array}
   *   An array containing objects that describe the number of results in each
   *   month.
   */
  getResultsCountByMonth(result = 'all') {
    const resultsByMonth = [];
    Object.entries(this.gamesByMonth).forEach(([month, games]) => {
      resultsByMonth.push({
        month: new Date(month),
        count: result !== 'all' ? games.filter(game => game.result === result).length : games.length
      });
    });
    return resultsByMonth.sort((a, b) => a.month - b.month);
  }

  /**
   * @param {number} iterator
   *   A counter used to make this method recursive.
   * @returns {Object}
   *   A object that describes the streak.
   */
  getStreak(iterator = 0) {
    if (this.games.length <= 0 ) {
      return null;
    }
    if (this.games[iterator + 1]) {
      let game1 = this.games[iterator];
      let game2 = this.games[iterator + 1];

      if (game1.result === game2.result) {
        iterator++;
        return this.getStreak(iterator);
      }
    }
    return {
      count: iterator === 0 ? null : iterator + 1,
      type: iterator === 0 ? null : this.games[iterator].result
    };
  }
}
