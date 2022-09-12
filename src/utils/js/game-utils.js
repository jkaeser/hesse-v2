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
   * @returns {array}
   *   An array of numbers.
   */
  get playerCounts() {
    return this.games
      .map(game => game.decks.length)
      .reduce((playerCounts, count) => {
        if (count !== 0 && playerCounts.indexOf(count) === -1) {
          playerCounts.push(count);
        }
        return playerCounts.sort((a, b) => b - a);
      }, []);
  }

  /**
   * @returns {Array}
   *   An array of strings.
   */
  get commanders() {
    return this.games
      .map(game => game.decks)
      .reduce((commanders, deck) => {
        if (commanders.indexOf(deck.commander) === -1) {
          commanders.push(deck.commander);
        }
        return commanders;
      }, []);
  }

  /**
   * @returns {Array}
   *   An array of Deck nodes.
   */
  get winners() {
    return this.games
      .map(game => game.winner)
      .reduce((winners, winner) => {
        if (!winners.find(prevWinner => prevWinner.id === winner.id)) {
          winners.push(winner)
        }
        return winners;
      }, []);
  }

  /**
   * @returns {Object}
   *   An object containing arrays of game nodes keyed by color.
   */
  get gamesByColor() {
    return this.games.reduce((byColor, game) => {
      game.decks.forEach(deck => deck.colors.forEach(color => {
        byColor[color].push(game);
      }));
      return byColor;
    }, {white: [], blue: [], black: [], red: [], green: []});
  }

  /**
   * @returns {Object}
   *   A game node.
   */
  get latestGame() {
    return this.games.length > 0 ? this.games[0] : null;
  }

  /**
   * @returns {Object}
   *   An object containing arrays of game nodes keyed by color.
   */
  get winsByColor() {
    return this.games.reduce((byColor, game) => {
      game.winner.colors.forEach(color => {
        byColor[color].push(game);
      });
      return byColor;
    }, { white: [], blue: [], black: [], red: [], green: [] });
  }

  /**
   * @returns {Array}
   *   An array of objects describing the percentage of wins by color.
   */
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

  /**
   * @returns {Object}
   *   An object containing arrays of game nodes keyed by date.
   */
  get gamesByMonth() {
    const gamesByMonth = this.games.reduce((byMonth, game) => {
      const date = new Date(game.date);
      // Setting to the middle of the month helps avoid time zone issues.
      const dateKey = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-15`;
      if (!byMonth.hasOwnProperty(dateKey)) {
        byMonth[dateKey] = [];
      }
      byMonth[dateKey].push(game);
      return byMonth;
    }, {});

    const resultsByMonth = [];
    Object.entries(gamesByMonth).forEach(([month, games]) => {
      resultsByMonth.push({
        month: new Date(month),
        count: games.length
      });
    });
    return resultsByMonth.sort((a, b) => a.month - b.month);
  }

  // /**
  //  * @param {string} result
  //  *   'all', 'win', 'loss'.
  //  * @returns {Array}
  //  *   An array containing objects that describe the number of results in each
  //  *   month.
  //  */
  // getResultsCountByMonth(result = 'all') {
  //   const resultsByMonth = [];
  //   Object.entries(this.gamesByMonth).forEach(([month, games]) => {
  //     resultsByMonth.push({
  //       month: new Date(month),
  //       count: result !== 'all' ? games.filter(game => game.result === result).length : games.length
  //     });
  //   });
  //   return resultsByMonth.sort((a, b) => a.month - b.month);
  // }
}
