import { makeAutoObservable } from "mobx";
import Cookie from 'mobx-cookie';


class LanguageStore {


    private languageCookie = new Cookie('language')

    constructor() {
        makeAutoObservable(this);
    }

    get languages(){
       return [{value:'EN',name:'English'},{value:"FI",name:"Finnish"}]
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
