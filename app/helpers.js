export function formatDate (date, type) {
    // console.log(date.toString())
    if (type === 'full') {
      return date.toString();
    }
    date = new Date(date);
    let formatter = null;
    if (type === 'hour') {
      formatter = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    } else if (type === 'day') {
      formatter = new Intl.DateTimeFormat('id-ID', { day: '2-digit', timeZone: 'UTC' });
    } else {
      formatter = new Intl.DateTimeFormat('id-ID', { month: 'short', timeZone: 'UTC' });
    }
    return formatter.format(date);
}

export function validateEmail (email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function extractImagesFromString (string) {
  return string.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
}