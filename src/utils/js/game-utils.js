export const getWins = (games) => (
  games.filter(game => game.result === 'win')
)

export const getLosses = (games) => (
  games.filter(game => game.result === 'loss')
)

export const getWinLossRatio = (games) => (
  Number(getWins(games).length / getLosses(games).length).toPrecision(2)
)

export const getPlayerCounts = (games) => (
  games
  .map(game => game.opponents.length)
  .reduce(
    (previousValue, count) => {
      const countWithPlayer = count + 1;
      if (count !== 0 && previousValue.indexOf(countWithPlayer) === -1) {
        previousValue.push(countWithPlayer);
      }
      return previousValue;
    }, []
  )
)

export const sortGamesByDate = (games) => (
  games.sort((a, b) => new Date(b.date) - new Date(a.date))
)

