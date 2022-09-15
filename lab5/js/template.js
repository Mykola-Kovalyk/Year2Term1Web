export const EDIT_BUTTON_PREFIX = "edit-";
export const DELETE_BUTTON_PREFIX = "delete-";


export const itemTemplate = ({id, title, description, slots}) => `
                <li id="${id}" class="hero_data-list-item">
                    <img class="hero_data-list-item-img" src="media/parking.png" alt="parking.png">
                    <br>
                    &emsp;<h2 class="hero_data-list-item-title">${title}</h2>
                    
                    <div class="hero_data-list-item-text" style="font-size: small; padding: 20px;">
                    ${description}
                    </div>
                    
                    <br>
                    <h6 style="padding: 10px">Number of parking slots: </h6><h6 class="hero_data-list-item-parking-slots">${slots}</h6>
                    <br>

                    <div class="hero_data-list-item-buttons" style="display: flex;">
                        <button class="hero_data-list-item-edit" id="${EDIT_BUTTON_PREFIX}${id}" onclick="editItem(this)">Edit</button>
                        <button class="hero_data-list-item-delete" id="${DELETE_BUTTON_PREFIX}${id}" onclick="deleteItem(this)">Delete</button>
                    </div>
                </li>
`;