export const getWins = (games) => (
  games.filter(game => game.result === 'win')
)

export const getLosses = (games) => (
  games.filter(game => game.result === 'loss')
)

export const getWinLossRatio = (games) => {
  const wins = getWins(games).length;
  const losses = getLosses(games).length;
  const ratio = Number(wins/(losses > 0 ? losses : 1));
  return ratio < 1 ? ratio.toPrecision(2) : ratio.toPrecision(3)
}

export const getPlayerCounts = (games) => (
  games
    .map(game => game.opponents.length)
    .reduce((previousValue, count) => {
        const countWithPlayer = count + 1;
        if (count !== 0 && previousValue.indexOf(countWithPlayer) === -1) {
          previousValue.push(countWithPlayer);
        }
        return previousValue;
      }, [])
)

export const getPlayerCommanders = (games) => (
  games
    .map(game => game.deck.commander)
    .reduce((commanders, commander) => {
        if (commanders.indexOf(commander) === -1) {
          commanders.push(commander);
        }
        return commanders;
      }, [])
)

export const getOpponentDecks = (games) => {
  const uniqueOpponents = games
    .reduce((opponents, game) => {
      return [...opponents, ...game.opponents];
    }, [])
    .reduce((acc, opponent) => {
      if (Object.keys(acc).indexOf(opponent.id) === -1) {
        acc[opponent.id] = opponent;
      }
      return acc;
    }, {});

  return Object.values(uniqueOpponents);
}

export const sortGamesByDate = (games) => (
  games.sort((a, b) => new Date(b.date) - new Date(a.date))
)

