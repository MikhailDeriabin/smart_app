import {FetchUtil} from "./util/FetchUtil.js";
import {ValidationUtil} from "./util/ValidationUtil.js";
import {UIUtil} from "./util/UIUtil.js";

const fetchUtil = new FetchUtil();
const validationUtil = new ValidationUtil();
const uiUtil = new UIUtil();

const addStatusSection = document.querySelector("#addStatusSection");
const statusInput = addStatusSection.querySelector('#statusInput');
const typesAddFieldset = addStatusSection.querySelector(".typesFieldset");
let typeAddCheckboxes;
const addStatusButton = addStatusSection.querySelector('#addStatusButton');
const infoBoxAddP = addStatusSection.querySelector(".infoBoxP");

const updateStatusSection = document.querySelector('#updateStatusSection');
const statusSelect = updateStatusSection.querySelector('#statusSelect');
const typesUpdateFieldset = updateStatusSection.querySelector(".typesFieldset");
let typeUpdateCheckboxes;
const updateStatusButton = updateStatusSection.querySelector('#updateStatusButton');
const infoBoxUpdateP = updateStatusSection.querySelector(".infoBoxP");

const statusesTable = document.querySelector("#statusesTable");

window.addEventListener("load", async () => {
    const types = await fetchUtil.getDB('type');
    const typeLabelCheckboxesAdd = uiUtil.generateCheckLabelBoxes(types, 'type', 'typeCheckbox');
    typesAddFieldset.append(...typeLabelCheckboxesAdd);
    typeAddCheckboxes = typesAddFieldset.querySelectorAll('.typeCheckbox');

    const typeLabelCheckboxesUpdate = uiUtil.generateCheckLabelBoxes(types, 'type', 'typeCheckbox');
    typesUpdateFieldset.append(...typeLabelCheckboxesUpdate);
    typeUpdateCheckboxes = typesUpdateFieldset.querySelectorAll('.typeCheckbox');

    const statuses = await fetchUtil.getDB('status');

    const statusSelectOptions = uiUtil.generateOptionArray(statuses, 'status', '');
    statusSelect.append(...statusSelectOptions);

    if(statuses != null && statuses.length > 0){
        const firstStatusTypes = statuses[0].Type;
        updateTypeCheckboxesOnSelect(firstStatusTypes);
    }

    const rows = uiUtil.generateTypeStatusRows(statuses, 'status', 'Type', 'type', updateStatus, deleteStatus);
    statusesTable.append(...rows);
});

addStatusButton.addEventListener('click', async () => {
    const statusName = statusInput.value;

    if(!validationUtil.hasStrArrayNullEmpty([ statusName ])){
        try{
            const chosenTypes = [];
            for(let i=0; i<typeAddCheckboxes.length; i++){
                if(typeAddCheckboxes[i].checked)
                    chosenTypes.push(typeAddCheckboxes[i].value);
            }

            const upperCaseStatusName = statusName.toUpperCase();

            const data = {status: upperCaseStatusName, type: chosenTypes};
            const status = await fetchUtil.postDB('status', data);

            if(status != null){
                const statusTypes = await fetchUtil.getDB(`status/${status.status}`);
                status.Type = statusTypes.Type;
                const newStatusRow = uiUtil.generateTypeStatusRows([status], 'status', 'Type', 'type', updateStatus, deleteStatus);
                statusesTable.append(...newStatusRow);
                infoBoxAddP.textContent = "status created";
            }else
                infoBoxAddP.textContent = "something went wrong";
        }catch (e) {
            console.log(e);
            infoBoxAddP.textContent = "something went wrong";
        }
    } else{
        infoBoxAddP.textContent = "please, check the required parameters";
    }
});

statusSelect.addEventListener('change', async () => {
    const selectedStatus = statusSelect.value;
    const statusData = await fetchUtil.getDB(`status/${selectedStatus}`);
    const statusTypes = statusData.Type;
    updateTypeCheckboxesOnSelect(statusTypes);
});

updateStatusButton.addEventListener('click', async () => {
    try{
        const status = statusSelect.value;
        const typesAdd = [];
        for(let i=0; i<typeUpdateCheckboxes.length; i++){
            if(typeUpdateCheckboxes[i].checked)
                typesAdd.push(typeUpdateCheckboxes[i].value);
        }

        const typesDelete = [];
        for(let i=0; i<typeUpdateCheckboxes.length; i++){
            if(!typeUpdateCheckboxes[i].checked)
                typesDelete.push(typeUpdateCheckboxes[i].value);
        }

        const result = await fetchUtil.putDB('status',  { status: status, typeUpdate: typesAdd, typeDelete: typesDelete });
        if(result === true){
            infoBoxUpdateP.textContent = "status updated";
        } else{
            infoBoxUpdateP.textContent = "something went wrong";
        }
    }catch (e) {
        console.log(e);
        infoBoxUpdateP.textContent = "something went wrong";
    }
});

async function deleteStatus(evt) {
    const button = evt.target;
    const status = button.dataset.value;
    const isSuccess = await fetchUtil.deleteDB(`status/${status}`);
    if(isSuccess)
        button.closest('tr').remove();
}

function updateStatus(evt) {
    const button = evt.target;
    const status = button.dataset.value;
    statusSelect.value = status;
    statusSelect.dispatchEvent(new Event('change'));
}

function updateTypeCheckboxesOnSelect(statusTypes) {
    const typeStrings = [];
    for(let i=0; i<statusTypes.length; i++)
        typeStrings.push(statusTypes[i].type);

    for(let i=0; i<typeUpdateCheckboxes.length; i++) {
        if (typeStrings.includes(typeUpdateCheckboxes[i].value))
            typeUpdateCheckboxes[i].checked = true;
        else
            typeUpdateCheckboxes[i].checked = false;
    }
}