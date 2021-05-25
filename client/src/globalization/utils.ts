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