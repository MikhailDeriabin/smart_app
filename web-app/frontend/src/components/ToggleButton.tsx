import classes from './ToggleButton.module.css';
import {Component} from "react";

class ToggleButton extends Component<{ handleClick: any }> {
    render() {
        let {handleClick} = this.props;
        //const {t} = useTranslation();
        return (
            <input type="checkbox" onClick={handleClick} className={classes.toggle}/>
        );
    }
}

export default ToggleButton;



