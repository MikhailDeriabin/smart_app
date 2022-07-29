import classes from './ToggleButton.module.css';

const ToggleButton = () => {
    //const {t} = useTranslation();
    return (
        <input type="checkbox" className={classes.toggle}/>
    );
};
export default ToggleButton;



