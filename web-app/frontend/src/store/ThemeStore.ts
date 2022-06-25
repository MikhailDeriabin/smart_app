import { makeAutoObservable } from "mobx";

class ThemeStore {

    private theme: string = "light"

    constructor() {
        makeAutoObservable(this)
    }

    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light"
        console.log(this.theme)
    }

    get currentTheme() {
        return this.theme;
    }
}

export default new ThemeStore();
