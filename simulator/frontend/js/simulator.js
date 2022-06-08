import {FetchUtil} from "./util/FetchUtil.js";
import {UIUtil} from "./util/UIUtil.js";

const fetchUtil = new FetchUtil();
const uiUtil = new UIUtil();

const devicesSection = document.querySelector("#devicesSection");

window.addEventListener("load", async () => {
    const devices = await fetchUtil.getDB('device');
    for (let i = 0; i < devices.length; i++) {
        const deviceCard = uiUtil.generateBasicDeviceCard(devices[i]);
        await uiUtil.addStatusSelectToCard(deviceCard, devices[i]);
        devicesSection.appendChild(deviceCard);
    }
});