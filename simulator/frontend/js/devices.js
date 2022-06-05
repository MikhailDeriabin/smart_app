const dev1 = {
    deviceId: 1,
    deviceType: "lamp",
    deviceManufacturer: "Denver",
    devicePowerConsumption: "15"
}

const dev2 = {
    deviceId: 2,
    deviceType: "katle",
    deviceManufacturer: "Bosch",
    devicePowerConsumption: "700"
}

window.addEventListener("load", () => {
    const userDevicesSection = document.querySelector("#userDevicesSection");
    userDevices = [dev1, dev2];
    for (let i = 0; i < userDevices.length; i++) {
        const deviceCard = generateDeviceCard(userDevices[i]);
        userDevicesSection.appendChild(deviceCard);
    }
});

function generateDeviceCard(deviceObj) {
    const { deviceId, deviceType, deviceManufacturer, devicePowerConsumption } = deviceObj;
    const deviceDiv = document.createElement("div");
    deviceDiv.id = "deviceCard" + deviceId;
    deviceDiv.classList.add("deviceCard");

    const deviceTypeP = document.createElement("p");
    deviceTypeP.textContent = deviceType;
    const deviceManufacturerP = document.createElement("p");
    deviceManufacturerP.textContent = deviceManufacturer;
    const devicePowerConsuptionP = document.createElement("p");
    devicePowerConsuptionP.textContent = devicePowerConsumption + "W";

    const deviceDeleteButton = document.createElement("button");
    deviceDeleteButton.textContent = "delete";
    deviceDeleteButton.classList.add("clickable");

    deviceDiv.appendChild(deviceTypeP);
    deviceDiv.appendChild(deviceManufacturerP);
    deviceDiv.appendChild(devicePowerConsuptionP);
    deviceDiv.appendChild(deviceDeleteButton);

    return deviceDiv;
}