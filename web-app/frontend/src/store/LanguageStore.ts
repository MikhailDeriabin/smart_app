import { makeAutoObservable } from "mobx";
import Cookie from 'mobx-cookie';


class LanguageStore {


    private languageCookie = new Cookie('language')

    constructor() {
        makeAutoObservable(this);
    }

    private get languagesEn(){
       return [{value:'EN',name:'English'},{value:"FI",name:"Finnish"}]
    }

   private get languagesFi(){
        return [{value:'EN',name:'Englanti'},{value:"FI",name:"Suomi"}]
    }

    get languages(){
        if (this.language === "EN") {
            return this.languagesEn
        }
        return this.languagesFi
    }


    get language() {
        return this.languageCookie.value  ? this.languageCookie.value : "EN";
    }

    setLanguage = (language:string) => {
        this.languageCookie.set(language,{expires: 365})
    }

    unsetLanguage = () => {
        this.languageCookie.remove()
    }

}

export default new LanguageStore();
