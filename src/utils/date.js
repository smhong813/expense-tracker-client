/**
 * Return a string with a format YYYY-MM-DD from a string that Date object can recognize
 * @param {string} dateStr
 * @returns {string} YYYY-MM-DD i.e. 2021-08-13
 */
export const get4Y2M2D = (dateStr) => {
  const d = new Date(dateStr);
  const date = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
  return [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
  ].join("-");
};
