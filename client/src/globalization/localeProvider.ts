import EventEmitter from "events";

class LocaleProvider {
currentLocale: string;
    availableLocales: string[];
    defaultLocale: string;
    emitter: EventEmitter;

    constructor(currentLocale = 'en', availableLocales = ['en', 'fr'], defaultLocale = 'en'){
        this.currentLocale = currentLocale;
        this.availableLocales = availableLocales;
        this.defaultLocale = defaultLocale;
        this.emitter = new EventEmitter();
    }

    getDefault() {
        return this.defaultLocale;
      }
    
    getCurrent() {
        return this.currentLocale;
    }

    setCurrent(locale: string){
        if (!this.availableLocales.includes(locale)) {
            console.warn('Sorry ', locale, 'is not supported right now. Setting default');
            this.currentLocale = this.defaultLocale;
        }
        this.currentLocale = locale;
        this.emitter.emit('locale:changed', locale);
    }

    onChangeLocale(cb: (...args: any[]) => void) {
        this.emitter.on('locale:changed', cb);
    }
}

export default LocaleProvider;