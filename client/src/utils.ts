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

  export const formatTime = (timer: number) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const getMinutes = `0${Math.floor(timer / 60)}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }