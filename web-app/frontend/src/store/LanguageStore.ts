import { makeAutoObservable } from "mobx";
import Cookie from 'mobx-cookie';



interface ILanguageObject{
    value:string,
    name: string
}

class LanguageStore {


    private _languageCookie:Cookie = new Cookie('language')

    private _languagesEn:ILanguageObject[] = [{value:'EN',name:'English'},{value:"FI",name:"Finnish"},{value:"RU",name: "Russian"}]

    private _languagesFi:ILanguageObject[] = [{value:'EN',name:'Englanti'},{value:"FI",name:"Suomi"},{value:"RU",name: "Venäjä"}]

    private _languagesRu:ILanguageObject[] = [{value:'EN',name:'Английский'},{value:"FI",name:"Финский"},{value:"RU",name: "Русский"}]


    constructor() {
        makeAutoObservable(this);
    }

    get languages():ILanguageObject[]{

        switch(this.language) {
            case "FI":
                return this._languagesFi
            case "RU":
                return this._languagesRu
            default:
                return this._languagesEn
        }
    }


    get language():string {
        return this._languageCookie.value  ? this._languageCookie.value : "EN";
    }

    setLanguage = (language:string):void => {
        this._languageCookie.set(language,{expires: 365})
    }

    unsetLanguage = ():void => {
        this._languageCookie.remove()
    }

}

export default new LanguageStore();
