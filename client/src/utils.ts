export function detectLocale() {
    const languageString = navigator.language || '';
    const language = languageString.split(/[_-]/)[0].toLowerCase();
  
    switch (language) {
    case 'en':
      return 'en';
    case 'fr':
      return 'fr';
    default:
      return 'en';
    }
  }

  export const formatTime = (milliseconds: number) => {
    let seconds = milliseconds / 1000;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    let formatSeconds = `${Math.floor(seconds) % 60}s`;
    let formatMinutes = minutes > 0 ? `${minutes % 60}m ` : '';
    let formatHours = hours > 0 ? `${hours}h ` : '';

    return `${formatHours}${formatMinutes}${formatSeconds}`
  }

  /**
* Returns the index of the last element in the array where predicate is true, and -1
* otherwise.
* @param array The source array to search in
* @param predicate find calls predicate once for each element of the array, in descending
* order, until it finds one where predicate returns true. If such an element is found,
* findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
* src:https://stackoverflow.com/a/53187807
*/
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
      if (predicate(array[l], l, array))
          return l;
  }
  return -1;
}