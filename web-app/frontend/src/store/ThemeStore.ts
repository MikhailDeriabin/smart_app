import { makeAutoObservable } from "mobx";
import Cookie from 'mobx-cookie';

class ThemeStore {

    private themeCookie:Cookie = new Cookie('theme')
   /* private setDark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    };

    private setLight = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
    };*/

    constructor() {
        makeAutoObservable(this);
    }

    get theme():string {
        return !this.themeCookie.value  ? "light" : this.themeCookie.value;
    }

    setTheme = ():void => {
        this.themeCookie.set(this.theme!=null && this.theme==="light"? "dark" : "light", { expires: 365 }) // 365 day expiry

      /*  if(this.theme==="light"){
            this.setLight();
        } else {
            this.setDark();
        }*/
    }

    unsetTheme = ():void => {
        this.themeCookie.remove()
    }

}

export default new ThemeStore();
