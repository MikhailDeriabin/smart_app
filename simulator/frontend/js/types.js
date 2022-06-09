import {FetchUtil} from "./util/FetchUtil.js";
import {ValidationUtil} from "./util/ValidationUtil.js";
import {UIUtil} from "./util/UIUtil.js";

const fetchUtil = new FetchUtil();
const validationUtil = new ValidationUtil();
const uiUtil = new UIUtil();

const addTypeSection = document.querySelector("#addTypeSection");
const typeInput = addTypeSection.querySelector('#typeInput');
const statusesAddFieldset = addTypeSection.querySelector(".statusesFieldset");
let statusAddCheckboxes;
const addTypeButton = addTypeSection.querySelector('#addTypeButton');
const infoBoxAddP = addTypeSection.querySelector(".infoBoxP");

const updateTypeSection = document.querySelector('#updateTypeSection');
const typeSelect = updateTypeSection.querySelector('#typeSelect');
const statusesUpdateFieldset = updateTypeSection.querySelector(".statusesFieldset");
let statusUpdateCheckboxes;
const updateTypeButton = updateTypeSection.querySelector('#updateTypeButton');
const infoBoxUpdateP = updateTypeSection.querySelector(".infoBoxP");

const typesTable = document.querySelector("#typesTable");

window.addEventListener("load", async () => {
    const statuses = await fetchUtil.getDB('status');
    const statusLabelCheckboxesAdd = uiUtil.generateCheckLabelBoxes(statuses, 'status', 'statusCheckbox');
    statusesAddFieldset.append(...statusLabelCheckboxesAdd);
    statusAddCheckboxes = statusesAddFieldset.querySelectorAll('.statusCheckbox');

    const statusLabelCheckboxesUpdate = uiUtil.generateCheckLabelBoxes(statuses, 'status', 'statusCheckbox');
    statusesUpdateFieldset.append(...statusLabelCheckboxesUpdate);
    statusUpdateCheckboxes = statusesUpdateFieldset.querySelectorAll('.statusCheckbox');

    const types = await fetchUtil.getDB('type');

    const typeSelectOptions = uiUtil.generateOptionArray(types, 'type', '');
    typeSelect.append(...typeSelectOptions);

    if(types != null && types.length > 0){
        const firstTypeStatuses = types[0].Status;
        updateStatusCheckboxesOnSelect(firstTypeStatuses);
    }

    const rows = uiUtil.generateTypeStatusRows(types, 'type', 'Status', 'status', updateType, deleteType);
    typesTable.append(...rows);
});

addTypeButton.addEventListener('click', async () => {
    const typeName = typeInput.value;

    if(!validationUtil.hasStrArrayNullEmpty([ typeName ])){
        try{
            const chosenStatuses = [];
            for(let i=0; i<statusAddCheckboxes.length; i++){
                if(statusAddCheckboxes[i].checked)
                    chosenStatuses.push(statusAddCheckboxes[i].value);
            }

            const upperCaseTypeName = typeName.toUpperCase();

            const data = {type: upperCaseTypeName, status: chosenStatuses};
            const type = await fetchUtil.postDB('type', data);

            if(type != null){
                const typeStatuses = await fetchUtil.getDB(`type/${type.type}`);
                type.Status = typeStatuses.Status;
                const newTypeRow = uiUtil.generateTypeStatusRows([type], 'type', 'Status', 'status', updateType, deleteType);
                typesTable.append(...newTypeRow);
                infoBoxAddP.textContent = "type created";
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

typeSelect.addEventListener('change', async () => {
    const selectedType = typeSelect.value;
    const typeData = await fetchUtil.getDB(`type/${selectedType}`);
    const typeStatuses = typeData.Status;
    updateStatusCheckboxesOnSelect(typeStatuses);
});

updateTypeButton.addEventListener('click', async () => {
    try{
        const type = typeSelect.value;
        const statusesAdd = [];
        for(let i=0; i<statusUpdateCheckboxes.length; i++){
            if(statusUpdateCheckboxes[i].checked)
                statusesAdd.push(statusUpdateCheckboxes[i].value);
        }

        const statusesDelete = [];
        for(let i=0; i<statusUpdateCheckboxes.length; i++){
            if(!statusUpdateCheckboxes[i].checked)
                statusesDelete.push(statusUpdateCheckboxes[i].value);
        }

        const result = await fetchUtil.putDB('type',  { type: type, statusUpdate: statusesAdd, statusDelete: statusesDelete });
        if(result === true){
            infoBoxUpdateP.textContent = "type updated";
        } else{
            infoBoxUpdateP.textContent = "something went wrong";
        }
    }catch (e) {
        console.log(e);
        infoBoxUpdateP.textContent = "something went wrong";
    }
});

async function deleteType(evt) {
    const button = evt.target;
    const type = button.dataset.value;
    const isSuccess = await fetchUtil.deleteDB(`type/${type}`);
    if(isSuccess)
        button.closest('tr').remove();
}

function updateType(evt) {
    const button = evt.target;
    const type = button.dataset.value;
    typeSelect.value = type;
    typeSelect.dispatchEvent(new Event('change'))
}

function updateStatusCheckboxesOnSelect(typeStatuses) {
    const statusStrings = [];
    for(let i=0; i<typeStatuses.length; i++)
        statusStrings.push(typeStatuses[i].status);

    for(let i=0; i<statusUpdateCheckboxes.length; i++) {
        if (statusStrings.includes(statusUpdateCheckboxes[i].value))
            statusUpdateCheckboxes[i].checked = true;
        else
            statusUpdateCheckboxes[i].checked = false;
    }
}