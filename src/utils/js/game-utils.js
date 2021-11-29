import formatDate from "utils/js/formatters/date"

export class Games {
  constructor(games) {
    this.games = games.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  setGames(games) {
    this.games = games;
  }

  get wins() {
    return this.games.filter(game => game.result === 'win');
  }

  get losses() {
    return this.games.filter(game => game.result === 'loss');
  }

  get winLossRatio() {
    const ratio = Number(this.wins.length/(this.losses.length > 0 ? this.losses.length : 1));
    return ratio < 1 ? ratio.toPrecision(2) : ratio.toPrecision(3)
  }

  get playerCounts() {
    return this.games
      .map(game => game.opponents.length)
      .reduce((previousValue, count) => {
        const countWithPlayer = count + 1;
        if (count !== 0 && previousValue.indexOf(countWithPlayer) === -1) {
          previousValue.push(countWithPlayer);
        }
        return previousValue;
      }, [])
  }

  get playerCommanders() {
    return this.games
      .map(game => game.deck.commander)
      .reduce((commanders, commander) => {
        if (commanders.indexOf(commander) === -1) {
          commanders.push(commander);
        }
        return commanders;
      }, [])
  }

  get opponentDecks() {
    return Object.values(this.games
      .reduce((opponents, game) => {
        return [...opponents, ...game.opponents];
      }, [])
      .reduce((acc, opponent) => {
        if (Object.keys(acc).indexOf(opponent.id) === -1) {
          acc[opponent.id] = opponent;
        }
        return acc;
      }, {})
    );
  }

  get gamesByColor() {
    return this.games.reduce((byColor, game) => {
      game.deck.colors.forEach(color => {
        byColor[color].push(game);
      });
      return byColor;
    }, {white: [], blue: [], black: [], red: [], green: []})
  }

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
    }, {})
  }

  get latestGame() {
    return this.games.length > 0
      ? formatDate(this.games[0].date)
      : null
  }

  getResultsCountByMonth(result = 'win') {
    const resultsByMonth = [];
    Object.entries(this.gamesByMonth).forEach(([month, games]) => {
      resultsByMonth.push({
        month: new Date(month),
        count: games.filter(game => (
          game.result === result
        )).length
      });
    });
    return resultsByMonth.sort((a, b) => a.month - b.month)
  }

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
