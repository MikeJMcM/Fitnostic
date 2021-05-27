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