const toNormalFormat = (timeSec: number) => {
  let minutes = String(Math.floor(timeSec / 60));
  let seconds = String(Math.floor(timeSec - Number(minutes) * 60));

  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;
};

export const msToSec = (ms: number) => Math.floor(ms / 1000);

const doubleNumber = (d: number) =>
  String(d).length === 1 ? "0" + String(d) : String(d);

export const dateToApiFormat = (ms: number) => {
  const date = new Date(ms);

  return `${date.getFullYear()}-${doubleNumber(
    date.getMonth() + 1
  )}-${doubleNumber(date.getDate())}`;
};

export default toNormalFormat;
