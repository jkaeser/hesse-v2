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
  games.reduce(
    (previousValue, game) => {
      if (previousValue.indexOf(game.player_count) === -1) {
        previousValue.push(game.player_count);
      }
      return previousValue;
    }, []
  )
)

export const sortGamesByDate = (games) => (
  games.sort((a, b) => new Date(b.date) - new Date(a.date))
)

