export function getFormattedDate(unixTimeStamp) {
  const date = new Date(unixTimeStamp * 1000);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  return formatter.format(date);
}

export function getJobTitleAndInfo(text) {
  const arr = text.split(/\((YC [^)]+)\)/);
  let title = "N/A";
  let info = "N/A";
  if (arr.length > 1) {
    title = `${arr[0]} ${arr[1]}`; 
  }
  if (arr.length > 2) {
    info = arr[2];
  }
  return { title, info };
}