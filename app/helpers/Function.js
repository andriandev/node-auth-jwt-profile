export const getCurrentDate = () => {
  // Add zero number example 2022-5-2 3:2:5 => 2022-05-02 03:02:05
  const addZero = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  // Date init
  const date = new Date();

  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());

  const datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return datetime;
};

export const timestampToDatetime = (timestamp) => {
  // Add zero number example 2022-5-2 3:2:5 => 2022-05-02 03:02:05
  const addZero = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  // Date init
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());

  const datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return datetime;
};

export const datetimeToTimestamp = (datetime) => {
  // Date init
  const date = new Date(datetime);

  // Convert Milliseconds to Seconds
  const timestamp = Math.floor(date.getTime() / 1000);

  return timestamp;
};
