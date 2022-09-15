import { showModal } from "./modal.js";
import { itemTemplate, EDIT_BUTTON_PREFIX, DELETE_BUTTON_PREFIX } from "./template.js"; 




const dataList = document.getElementById("hero_data-list");
const titleField = document.getElementById("hero_data-field-title");
const descriptionField = document.getElementById("hero_data-field-description");
const slotsField =  document.getElementById("hero_data-field-parking-slots");
const submitButton = document.getElementById("hero_data-field-add-item");
const sortButton = document.getElementById("hero_data-field-sort");
const filterInput = document.getElementById("hero_data-field-search");
const filterButton = document.getElementById("hero_data-field-filter");
const totalSlotsField = document.getElementById("hero_data-field-slots");

let parkingFacilities = [];
let idCounter = 0;
let editMode = false;
let itemToEditIndex = -1;



window.addItem = function() {

    if(!titleField.checkValidity() || !descriptionField.checkValidity() || !slotsField.checkValidity())
    {
        showModal("Oops!", "<p>The text you entered is in the wrong format. Check if you entered a valid title and text.</p>", []);
        return;
    }


    if(editMode)
    {
        var oldElement = parkingFacilities[itemToEditIndex]
        parkingFacilities[itemToEditIndex] = { id: oldElement.id, title: titleField.value, description: descriptionField.value, slots: parseInt(slotsField.value) };
        editMode = false;
    }
    else
    {
        parkingFacilities.push({ id: idCounter, title: titleField.value, description: descriptionField.value, slots: parseInt(slotsField.value) });
        idCounter++;
    }

    titleField.value = "";
    descriptionField.value = "";
    slotsField.value = ""
    refreshList(parkingFacilities);
}

window.editItem = function(editButton) {
    const htmlItem = document.getElementById(editButton.id.replace(EDIT_BUTTON_PREFIX, ""));
    

    var title = htmlItem.getElementsByClassName("hero_data-list-item-title")[0].innerText;
    var text = htmlItem.getElementsByClassName("hero_data-list-item-text")[0].innerText;
    titleField.value = title;
    descriptionField.value = text;

    itemToEditIndex = parkingFacilities.findIndex(element => element.id = htmlItem.id);
    editMode = true;
}


window.deleteItem = function(deleteButton) {
    const item = document.getElementById(deleteButton.id.replace(DELETE_BUTTON_PREFIX, ""));
    parkingFacilities = parkingFacilities.filter(element => element.id !== parseInt(item.id))
    refreshList(parkingFacilities);
}



window.refreshList = function(itemList) {
    dataList.innerHTML = "";

    var totalSlots = 0
    for (const facility of itemList) {
        dataList.insertAdjacentHTML("afterbegin", itemTemplate(facility));
        totalSlots += facility.slots
    }

    totalSlotsField.innerHTML = totalSlots
}

window.sortItems = function() {
    parkingFacilities = parkingFacilities.sort((a, b) => a.slots - b.slots)
    refreshList(parkingFacilities)
}

window.filterItems = function() {
    var filterText = filterInput.value

    var filteredArray = parkingFacilities.filter( (facility) => facility.title.search(filterText) !== -1 ||  facility.description.search(filterText) !== -1) 
    refreshList(filteredArray)
}

