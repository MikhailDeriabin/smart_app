import classes from './DeviceCard.module.css';
import ToggleButton from "./ToggleButton";
import FavoriteButton from "./FavoriteButton";

type Props = {
    name: string,
    manufacturer: string,
    description: string,
};
const DeviceCard = ({name, manufacturer, description}: Props) => {
    //const {t} = useTranslation();
    function handleClick() {
        console.log("Test")
    }

    return (
        <div className={classes.card}>
            <div className={classes.title}>
                <h3 className={classes.name}>{name}</h3>
                <FavoriteButton handleClick={handleClick}/>
            </div>
            <p className={classes.manufacturer}>{manufacturer}</p>
            <section className={classes.content}>
                <p className={classes.text}>OFF/ON</p>
                <div className={classes.buttonContainer}>
                    <ToggleButton handleClick={handleClick}/>
                </div>
            </section>
        </div>
    );
};
export default DeviceCard;



