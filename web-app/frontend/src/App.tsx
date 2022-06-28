import React from 'react';
import './App.css';
import ThemeStore from "./store/ThemeStore";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import {useTranslation} from "react-i18next";

const App = observer( () => {

    const { t } = useTranslation();

    return (
          <div className="App" id={ThemeStore.theme}>
              <BrowserRouter>
                  <NavBar/>
                  <AppRouter/>
              </BrowserRouter>

          </div>
  );
})

export default App;
