// format date
export function putZero(dateNumber: number) {
  return ('0' + dateNumber).slice(-2);
}

export function changeDateISOFormat(value: any) {
  const date = new Date(value);
  return `${date.getFullYear()}-${putZero(date.getMonth() + 1)}-${putZero(
    date.getDate()
  )}T${putZero(date.getHours())}:${putZero(date.getMinutes())}`;
}

export function changeDateFormat(value: any) {
  const date = new Date(value);
  return `${date.getFullYear()}/${putZero(date.getMonth() + 1)}/${putZero(
    date.getDate()
  )} ${putZero(date.getHours())}:${putZero(date.getMinutes())}`;
}
