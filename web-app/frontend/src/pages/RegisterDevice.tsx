import classes from "./RegisterDevice.module.css"
import {useTranslation} from "react-i18next";
import {useState} from "react";

const RegisterDevice = () => {
    const {t} = useTranslation();
    const [device, setDevice] = useState("")
    return (
        <div className={"container"}>
            <div className={classes.container}>
                <h1>{t('Register')}</h1>
                <div className={classes.row}>
                    <label htmlFor="device">{t('Device')}:</label>
                    <input defaultValue={device} disabled={true} type="text" id="device" name="device"/>
                    <button className={classes.button}
                            onClick={() => setDevice("192.168.1.203:3000")}>{t('Search')}</button>
                </div>
                <form className={classes.form} action={"/devices"}>
                    <fieldset disabled={device.length === 0}>
                        <div className={classes.row}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name"/>
                        </div>
                        <div className={classes.row}>
                            <label htmlFor="bname">Manufacturer/Brand:</label>
                            <input type="text" id="bname" name="bname"/>
                        </div>
                        <div className={classes.row}>
                            <label htmlFor="type">Type:</label>
                            <select name="type" id="type">
                                <option>Lamp</option>
                                <option>LED Lamp</option>
                                <option>House Appliances</option>
                            </select>
                        </div>
                        <input className={classes.register} type="submit" value="Register"/>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default RegisterDevice;
