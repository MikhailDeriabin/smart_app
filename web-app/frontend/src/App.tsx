import React from 'react';
import './App.css';
import Header from "./components/Header";
import ToggleThemeButton from "./components/ToggleThemeButton";
import ThemeStore from "./store/ThemeStore";
import {observer} from "mobx-react-lite";



const App = observer( () => {

    return (
          <div className="App" id={ThemeStore.currentTheme}>
                    <div className="container">
                        <Header/>
                        <h1>The Mobx use case example(Light/Dark mode)</h1>
                        <ToggleThemeButton/>
                        <div className="testElement">
                            {
                                ThemeStore.currentTheme === "light"
                                    ? <h4>Test element in light mode</h4>
                                    : <h4>Test element in dark mode</h4>
                            }
                        </div>
                    </div>
          </div>
  );
})

export default App;
