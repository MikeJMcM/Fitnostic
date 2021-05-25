import LocaleProvider from './localeProvider';
import Globalize from 'globalize';
import { detectLocale } from '../utils';
import strings from '../strings/en/strings.json';//TODO dynamically load messages
import stringsfr from '../strings/fr/strings.json';//TODO dynamically load messages
import likelySubtags from 'cldr-data/supplemental/likelySubtags.json';

const locale = new LocaleProvider(detectLocale());
locale.onChangeLocale((tag)=> console.log('Locale Changed to', tag));

class GlobalizeWrapper {

    title: string;
    //timerFormatter: Function;

    constructor(){
        this.initGlobalize();
        this.title = Globalize.formatMessage("appTitle");
        //this.timerFormatter = Globalize.dateFormatter({time: 'medium'});
    }

    initGlobalize(): void {
        Globalize.loadMessages(strings);
        Globalize.loadMessages(stringsfr);
        Globalize.load({//for some reason it is requiring loading this even though app isnt using plurals
            "supplemental": {
              "version": {
                "_unicodeVersion": "12.1.0",
                "_cldrVersion": "36"
              },
              "plurals-type-cardinal": {
                  "fr":{},
                  "en":{}
              }
            }
        });
        Globalize.load(likelySubtags);
        // Globalize.load(plurals);
        Globalize.locale(locale.getCurrent());
    };

    getTitle(): string {
        return this.title;
    }
    // getTimeFormatter(): Function {
    //     return this.timerFormatter;
    // }
    setCurrentLocale(localeString:string):void {
        locale.setCurrent(localeString);
    }
}

export default GlobalizeWrapper;