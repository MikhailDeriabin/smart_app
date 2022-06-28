import { makeAutoObservable } from "mobx";
import Cookie from 'mobx-cookie';


class LanguageStore {


    private _languageCookie = new Cookie('language')

    private _languagesEn = [{value:'EN',name:'English'},{value:"FI",name:"Finnish"}]

    private _languagesFi = [{value:'EN',name:'Englanti'},{value:"FI",name:"Suomi"}]

    constructor() {
        makeAutoObservable(this);
    }

    get languages(){
        if (this.language === "EN") {
            return this._languagesEn
        }
        return this._languagesFi
    }


    get language() {
        return this._languageCookie.value  ? this._languageCookie.value : "EN";
    }

    setLanguage = (language:string) => {
        this._languageCookie.set(language,{expires: 365})
    }

    unsetLanguage = () => {
        this._languageCookie.remove()
    }

}

export default new LanguageStore();
