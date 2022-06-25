import React from 'react';
import './App.css';
import Header from "./components/Header";
import ToggleThemeButton from "./components/ToggleThemeButton";
import ThemeStore from "./store/ThemeStore";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";

const App = observer( () => {

    return (
          <div className="App" id={ThemeStore.currentTheme}>
              <AppRouter/>

          </div>
  );
})

export default App;
