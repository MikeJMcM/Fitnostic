import LocaleProvider from './localeProvider';
import Globalize from 'globalize';
import { detectLocale } from './utils';
import * as strings from '../strings/en/strings.json';//TODO dynamically load messages
import * as stringsfr from '../strings/en/strings.json';//TODO dynamically load messages

const locale = new LocaleProvider(detectLocale());
locale.onChangeLocale((tag)=> console.log('Locale Changed to', tag));
console.log('Detected user locale is', detectLocale());
locale.setCurrent('fr');
console.log('Current user locale is', locale.getCurrent());
//TODO remove this testing code and call setcurrent in app

class GlobalizeWrapper {

    titleFormatter: Function;
    timerFormatter: Function;

    constructor(){
        this.initGlobalize();
        this.titleFormatter = Globalize.messageFormatter("appTitle");
        this.timerFormatter = Globalize.dateFormatter({time: 'medium'});
    }

    initGlobalize(): void {
        Globalize.loadMessages(strings);
        Globalize.loadMessages(stringsfr);
    };

    getTitle(): string {
        return this.titleFormatter();
    }
    getTimeFormatter(): Function {
        return this.timerFormatter;
    }
}

export default GlobalizeWrapper;