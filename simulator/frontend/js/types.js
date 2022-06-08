import {FetchUtil} from "./util/FetchUtil.js";
import {ValidationUtil} from "./util/ValidationUtil.js";
import {UIUtil} from "./util/UIUtil.js";

const fetchUtil = new FetchUtil();
const validationUtil = new ValidationUtil();
const uiUtil = new UIUtil();

const addTypeSection = document.querySelector("#addTypeSection");
const statusesFieldset = addTypeSection.querySelector("#statusesFieldset");
let statusCheckboxes;
const addTypeButton = addTypeSection.querySelector('#addTypeButton');
const typeInput = addTypeSection.querySelector('#typeInput');
const infoBoxP = addTypeSection.querySelector(".infoBoxP");
const typesTable = document.querySelector("#typesTable");

window.addEventListener("load", async () => {
    const statuses = await fetchUtil.getDB('status');
    const statusLabelCheckboxes = uiUtil.generateCheckLabelBoxes(statuses, 'status', 'statusCheckbox');
    statusesFieldset.append(...statusLabelCheckboxes);
    statusCheckboxes = statusesFieldset.querySelectorAll('.statusCheckbox');

    const types = await fetchUtil.getDB('type');
    const rows = uiUtil.generateTypeStatusRows(types, 'type', 'Status', 'status', null, deleteType);
    typesTable.append(...rows);
});

addTypeButton.addEventListener('click', async () => {
    const typeName = typeInput.value;

    if(!validationUtil.hasStrArrayNullEmpty([ typeName ])){
        try{
            const chosenStatuses = [];
            for(let i=0; i<statusCheckboxes.length; i++){
                if(statusCheckboxes[i].checked)
                    chosenStatuses.push(statusCheckboxes[i].value);
            }

            const upperCaseTypeName = typeName.toUpperCase();

            const data = {type: upperCaseTypeName, status: chosenStatuses};
            const type = await fetchUtil.postDB('type', data);

            if(type != null){
                const typeStatuses = await fetchUtil.getDB(`type/${type.type}`);
                type.Status = typeStatuses.Status;
                const newTypeRow = uiUtil.generateTypeStatusRows([type], 'type', 'Status', 'status', null, deleteType);
                typesTable.append(...newTypeRow);
                infoBoxP.textContent = "type created";
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

async function deleteType(evt) {
    const button = evt.target;
    const type = button.dataset.value;
    const isSuccess = await fetchUtil.deleteDB(`type/${type}`);
    if(isSuccess)
        button.closest('tr').remove();
}