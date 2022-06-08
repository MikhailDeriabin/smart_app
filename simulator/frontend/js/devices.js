import {FetchUtil} from "./util/FetchUtil.js";
import {ValidationUtil} from "./util/ValidationUtil.js";
import {UIUtil} from "./util/UIUtil.js";

const fetchUtil = new FetchUtil();
const validationUtil = new ValidationUtil();
const uiUtil = new UIUtil();

const addDeviceSection = document.querySelector("#addDeviceSection");
const infoBoxP = addDeviceSection.querySelector(".infoBoxP");
const manufacturerSelect = addDeviceSection.querySelector("#manufacturerSelect");
const typeSelect = addDeviceSection.querySelector("#typeSelect");
const powerConsumptionInput = addDeviceSection.querySelector("#powerConsumptionInput");
const addDeviceButton = addDeviceSection.querySelector("#addDeviceButton");
const userDevicesSection = document.querySelector("#userDevicesSection");

window.addEventListener("load", async () => {
    const manufacturers = await fetchUtil.getDB('manufacturer');
    const manufacturerOptions = uiUtil.generateOptionArray(manufacturers, 'manufacturerName');
    manufacturerSelect.append(...manufacturerOptions);

    const types = await fetchUtil.getDB('type');
    const typeOptions = uiUtil.generateOptionArray(types, 'type');
    typeSelect.append(...typeOptions);

    const devices = await fetchUtil.getDB('device');
    for (let i = 0; i < devices.length; i++) {
        const deviceCard = uiUtil.generateBasicDeviceCard(devices[i]);
        uiUtil.addDeleteButtonToCard(deviceCard, devices[i].deviceId);
        userDevicesSection.appendChild(deviceCard);
    }
});

addDeviceButton.addEventListener("click", async () => {
    infoBoxP.textContent = "";
    const manufacturerName = manufacturerSelect.value;
    const type = typeSelect.value;
    const powerConsumption = powerConsumptionInput.value;

    if(!validationUtil.hasStrArrayNullEmpty([ manufacturerName, type, powerConsumption ])){
        try{
            const data = {manufacturerName: manufacturerName, type: type, powerConsumption: powerConsumption};
            const createdDevice = await fetchUtil.postDB('device', data);

            if(createdDevice != null){
                infoBoxP.textContent = "device created";
                const newDeviceCard = uiUtil.generateBasicDeviceCard(createdDevice);
                uiUtil.addDeleteButtonToCard(newDeviceCard, createdDevice.deviceId);
                userDevicesSection.appendChild(newDeviceCard);
            }else
                infoBoxP.textContent = "something went wrong";
        }catch (e) {
            console.log(e);
            infoBoxP.textContent = "something went wrong";
        }
    } else{
        infoBoxP.textContent = "please, check the required parameters";
    }
});