import DeviceCard from "../components/DeviceCard";
import classes from "./Devices.module.css";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";


const Devices = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1>{t('devices')}</h1>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <DeviceCard name={"LED Lamppu"} description={"Etc"} manufacturer={"Bosh Led Lamppu"}/>
            <footer className={classes.buttonBar}>
                <button onClick={() => navigate("/devices/register")} className={classes.addNew}>Add</button>
                <button className={classes.remove}>Remove</button>
            </footer>
            <div></div>
        </div>
    );
};

export default Devices;
