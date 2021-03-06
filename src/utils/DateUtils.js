const getMonth = (month) => {
  return month.length < 2 ? `0${month}` : month;
};

const getDay = (day) => {
  return day.length < 2 ? `0${day}` : day;
};

export default function formatDate(date) {
  const d = new Date(date);
  const month = getMonth(`${d.getMonth() + 1}`);
  const day = getDay(`${d.getDate()}`);
  return `${d.getFullYear()}년${month}월${day}일 ${d.getHours()}시${d.getMinutes()}분`;
}
