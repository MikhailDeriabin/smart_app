import React from 'react';
import './App.css';
import Header from "./components/Header";
import ThemeStore from "./store/ThemeStore";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";

const App = observer( () => {

    return (
          <div className="App" id={ThemeStore.theme}>
              <BrowserRouter>
                  <NavBar/>
                  <Header/>
                  <AppRouter/>
              </BrowserRouter>

          </div>
  );
})

export default App;
