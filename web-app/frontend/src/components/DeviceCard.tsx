import classes from './DeviceCard.module.css';
import ToggleButton from "./ToggleButton";

const DeviceCard = () => {
    //const {t} = useTranslation();
    return (
        <div className={classes.card}>
            <h3 className={classes.name}>Test Device</h3>
            <p className={classes.manufacturer}>Bosh LED Lamppu</p>
            <section className={classes.content}>
                <p className={classes.text}>OFF/ON</p>
                <div className={classes.buttonContainer}>
                    <ToggleButton/>
                </div>
            </section>
        </div>
    );
};
export default DeviceCard;



