const month = [
  "янв",
  "фев",
  "марта",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сент",
  "окт",
  "ноября",
  "дек",
];

const weekDay = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const getHeaderDate = () => {
  const date = new Date();

  return `${weekDay[date.getDay() - 1]}, ${date.getDate()} ${
    month[date.getMonth()]
  }`;
};

export default getHeaderDate;
