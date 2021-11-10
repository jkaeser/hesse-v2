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
      if (acc.ids.indexOf(opponent.id) === -1) {
        acc.ids.push(opponent.id);
        acc.opponents.push(opponent);
      }
      return acc;
    }, {ids: [], opponents: []});

  return uniqueOpponents.opponents;
}

export const sortGamesByDate = (games) => (
  games.sort((a, b) => new Date(b.date) - new Date(a.date))
)

export const sortDecksByCommander = (decks) => (
  decks.sort((a, b) => ( a.commander >= b.commander ? 1 : -1))
)

