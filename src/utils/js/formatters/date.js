const formatDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}/${dateObj.getUTCFullYear()}`
}

export default formatDate
