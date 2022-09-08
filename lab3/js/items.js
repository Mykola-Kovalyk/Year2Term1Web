const EDIT_BUTTON_PREFIX = "edit-";
const DELETE_BUTTON_PREFIX = "delete-";

const dataList = document.getElementById("hero_data-list");
const titleField = document.getElementById("hero_data-field-title");
const descriptionField = document.getElementById("hero_data-field-description");
const submitButton = document.getElementById("hero_data-field-add-item");

let parkingFacilities = {};
let idCounter = 0;
let editMode = false;
let itemToEdit = null;

const itemTemplate = ({id, title, description}) => `
                <li id="${id}" class="hero_data-list-item">
                    <img class="hero_data-list-item-img" src="media/parking.png" alt="parking.png">
                    
                    &emsp;<h2 class="hero_data-list-item-title">${title}</h2>
                    
                    <div class="hero_data-list-item-text" style="font-size: small; padding: 20px;">
                    ${description}
                    </div>
                    
                    <div class="hero_data-list-item-buttons" style="display: flex;">
                        <button class="hero_data-list-item-edit" id="edit-${id}" onclick="editItem(this)">Edit</button>
                        <button class="hero_data-list-item-delete" id="delete-${id}" onclick="deleteItem(this)">Delete</button>
                    </div>
                </li>
`;

function addItem() {

    if(!titleField.checkValidity() || !descriptionField.checkValidity())
    {
        showModal("Oops!", "<p>The text you entered is in the wrong format. Check if you entered a valid title and text.</p>", []);
        return;
    }


    if(editMode)
    {
        parkingFacilities[itemToEdit.id] = { id: itemToEdit.id, title: titleField.value, description: descriptionField.value };
        editMode = false;
    }
    else
    {
        parkingFacilities[idCounter] = { id: idCounter, title: titleField.value, description: descriptionField.value };
        idCounter++;
    }

    titleField.value = "";
    descriptionField.value = "";
    refreshList();
}

function editItem(editButton) {
    const htmlItem = document.getElementById(editButton.id.replace(EDIT_BUTTON_PREFIX, ""));
    

    var title = htmlItem.getElementsByClassName("hero_data-list-item-title")[0].innerText;
    var text = htmlItem.getElementsByClassName("hero_data-list-item-text")[0].innerText;
    titleField.value = title;
    descriptionField.value = text;

    itemToEdit = parkingFacilities[htmlItem.id];
    editMode = true;
}


function deleteItem (deleteButton) {
    const item = document.getElementById(deleteButton.id.replace(DELETE_BUTTON_PREFIX, ""));
    delete parkingFacilities[item.id];
    refreshList();
}

function refreshList() {
    dataList.innerHTML = "";
    for (const [id, facility] of Object.entries(parkingFacilities)) {
        dataList.insertAdjacentHTML("afterbegin", itemTemplate(facility));
    }
}

function showModal(titleHtml, contentHtml, buttons) {
    const modal = document.createElement("div");

    modal.classList.add("modal");
    modal.innerHTML = `
            <div class="modal__inner">
                <div class="modal__top">
                    <div class="modal__title">${titleHtml}</div>
                    <button class="modal__close" type="button">
                        <span class="material-icons">close</span>
                    </button>
                </div>
                <div class="modal__content">${contentHtml}</div>
                <div class="modal__bottom"></div>
            </div>
        `;

    for (const button of buttons) {
        const element = document.createElement("button");

        element.setAttribute("type", "button");
        element.classList.add("modal__button");
        element.textContent = button.label;
        element.addEventListener("click", () => {
            if (button.triggerClose) {
                document.body.removeChild(modal);
            }

            button.onClick(modal);
        });

        modal.querySelector(".modal__bottom").appendChild(element);
    }

    modal.querySelector(".modal__close").addEventListener("click", () => {
        document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
}