function enumToDay(dayNum) {
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];
  return dayList[dayNum % 7];
}

export function dateFormat(date) {
  if (isNaN(date)) return "";
  let result = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}(${enumToDay(date.getDay())}) ${date.getHours()}:${date
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 })}`;
  return result;
}
