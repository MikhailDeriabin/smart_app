import { makeAutoObservable } from "mobx";
import Cookie from 'mobx-cookie';

class ThemeStore {

    private themeCookie = new Cookie('theme')

    constructor() {
        makeAutoObservable(this);
    }

    get theme() {
        return this.themeCookie.value  ? this.themeCookie.value : "light";
    }

    setTheme = () => {
        this.themeCookie.set(this.theme && this.theme==="light"? "dark" : "light", { expires: 365 }) // 365 day expiry
    }

    unsetTheme = () => {
        this.themeCookie.remove()
    }

}

export default new ThemeStore();
