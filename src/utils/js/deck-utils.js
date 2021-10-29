import formatDate from "utils/js/formatters/date"

export const getStreakCount = (games, iterator = 0) => {
  if (games[iterator + 1]) {
    let game1 = games[iterator];
    let game2 = games[iterator + 1];

    if (game1.result === game2.result) {
      iterator++;
      return getStreakCount(games, iterator);
    }
  }

  return iterator === 0 ? null : iterator + 1;
}

export const getStreakType = (games) => {
  let streak = null;
  if (games[0].result === games[1].result) {
    switch(games[0].result) {
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

export const getLatestGame = (games) => (
  games.length > 0
    ? formatDate(games[0].date)
    : null
)
