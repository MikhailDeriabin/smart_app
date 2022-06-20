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

    generateCheckLabelBoxes(valueObjects, valueKey, className){
        const labels = [];
        for(let i=0; i< valueObjects.length; i++){
            labels.push(this.generateCheckLabelBox('statusCheckbox'+i, valueObjects[i][valueKey], className));
        }

        return labels;
    }

    generateCheckLabelBox(id, value, className){
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = value;
        checkbox.id = id;
        if(className != null)
            checkbox.classList.add(className);

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.htmlFor = id;
        label.innerHTML += " " + value;

        return label;
    }

    generateTypeStatusRows(values, firstCellKey, secondCellKey, secondCellInsideKey, updateEventHandler, deleteEventHandler){
        const rows = [];
        for(let i=0; i<values.length; i++){
            const rowObj = values[i];
            const cell1Text = rowObj[firstCellKey];
            const cell2Objects = rowObj[secondCellKey];
            let cell2Text = "";
            if(cell2Objects != null){
                for(let j=0; j<cell2Objects.length; j++){
                    cell2Text += cell2Objects[j][secondCellInsideKey] + ", ";
                }
            }

            const row = this.generateRow3([cell1Text, cell2Text, '']);
            this.addUpdateDeleteBarToRow(row, cell1Text, cell1Text, updateEventHandler, deleteEventHandler);
            rows.push(row);
        }

        return rows;
    }

    addUpdateDeleteBarToRow(row, updateAttr, deleteAttr, updateEventHandler, deleteEventHandler){
        const lastCell = row.children[row.children.length-1];
        const bar = document.createElement('div');
        bar.classList.add('updateDeleteBar');
        const updateButton = this.generateButton('update', updateAttr, null, 'clickable', updateEventHandler);
        const deleteButton = this.generateButton('delete', deleteAttr, null, 'clickable', deleteEventHandler);
        bar.append(updateButton, deleteButton);
        lastCell.appendChild(bar);
    }

    generateRow3(values){
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');
        cell1.textContent = values[0];
        cell2.textContent = values[1];
        cell3.textContent = values[2];

        const row = document.createElement('tr');
        row.append(cell1, cell2, cell3);

        return row;
    }

    generateButton(text, attr, id, className, eventHandler){
        const button = document.createElement('button');
        if(text != null)
            button.textContent = text;
        if(attr != null)
            button.dataset.value = attr;
        if(id != null)
            button.id = id;
        if(className != null)
            button.classList.add(className);
        if(eventHandler != null){
            button.addEventListener('click', (evt) => {
                eventHandler(evt);
            });
        }
        return button;
    }
}