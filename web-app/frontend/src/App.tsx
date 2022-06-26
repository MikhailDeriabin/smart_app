import React from 'react';
import './App.css';
import Header from "./components/Header";
import ToggleThemeButton from "./components/ToggleThemeButton";
import ThemeStore from "./store/ThemeStore";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

const App = observer( () => {

    return (
          <div className="App" id={ThemeStore.currentTheme}>
              <BrowserRouter>
                  <Header/>
                  <AppRouter/>
              </BrowserRouter>

          </div>
  );
})

export default App;
