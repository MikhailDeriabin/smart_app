import './App.css';
import ThemeStore from "./store/ThemeStore";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";


const App = observer( () => {


    document.documentElement.setAttribute("data-theme", ThemeStore.theme);

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
