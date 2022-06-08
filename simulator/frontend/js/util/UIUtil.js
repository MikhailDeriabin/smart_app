import {FetchUtil} from "./FetchUtil.js";

const fetchUtil = new FetchUtil();

export class UIUtil {
    generateBasicDeviceCard(deviceObj) {
        const { deviceId, type, manufacturerName, powerConsumption } = deviceObj;
        const deviceDiv = document.createElement("div");

        deviceDiv.id = "deviceCard" + deviceId;
        deviceDiv.classList.add("deviceCard");

        const deviceTypeP = document.createElement("p");
        deviceTypeP.textContent = type;
        const deviceManufacturerP = document.createElement("p");
        deviceManufacturerP.textContent = manufacturerName;
        const devicePowerConsumptionP = document.createElement("p");
        devicePowerConsumptionP.textContent = powerConsumption + " W";

        deviceDiv.appendChild(deviceTypeP);
        deviceDiv.appendChild(deviceManufacturerP);
        deviceDiv.appendChild(devicePowerConsumptionP);

        return deviceDiv;
    }

    addDeleteButtonToCard(deviceCard, deviceId){
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.classList.add("clickable");
        deleteButton.dataset.deviceId = deviceId;
        deleteButton.addEventListener("click", async (evt) => {
            const button = evt.target;
            const deviceId = button.dataset.deviceId;
            await fetchUtil.deleteDB(`device/${deviceId}`);
            this.deleteElemParent(button);
        });

        deviceCard.appendChild(deleteButton);
    }

    async addStatusSelectToCard(deviceCard, deviceObj) {
        const deviceType = deviceObj.type;
        const type = await fetchUtil.getDB(`type/${deviceType}`);
        const possibleStatuses = type.Status;

        const deviceSelect = this.generateSelect(possibleStatuses, 'status', deviceObj.status);

        deviceSelect.addEventListener('change', (evt) => {
            const select = evt.target;
            const changedStatus = select.value;
            console.log(deviceObj.deviceId);
            console.log(changedStatus);
            fetchUtil.putDB(`device`, { deviceId: deviceObj.deviceId, status: changedStatus });
        })

        deviceCard.appendChild(deviceSelect);
    }

    deleteElemParent(elem){
        const parent = elem.parentElement;
        parent.remove();
    }

    generateSelect(objects, textKey, selectedValue){
        const select = document.createElement('select');
        const options = this.generateOptionArray(objects, textKey, selectedValue);
        select.append(...options);

        return select;
    }

    generateOptionArray(objects, textKey, selectedValue){
        const optionArray = [];
        for(let i=0; i<objects.length; i++){
            const optionText = objects[i][textKey];
            const option = new Option(optionText, optionText);
            if(optionText === selectedValue)
                option.selected = true;
            optionArray.push(option);
        }

        return optionArray;
    }
}