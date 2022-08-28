import ToggleThemeButton from "../components/ToggleThemeButton";
import {useNavigate} from "react-router-dom";
import ToggleLanguageSelect from "../components/ToggleLanguageSelect";

const Settings = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <ToggleThemeButton/>
            <ToggleLanguageSelect/>
            <button onClick={()=>navigate("/")}>Go back</button>
            {/*<div className="test">hello</div>*/}
        </div>
    );
};

export default Settings;
