import { useState, createContext } from "react";

const ParkingContext =  createContext({
    items: [],
    addItem: (item) => {},
    setItem: (itemId) => {},
    removeItem: (itemId) => {}
});



export function ParkingContextProvider(props) {

    const [list_items, setItems] =  useState([
        {
            id: 1,
            title: "Franko st.",
            description: "The parking near this street allows medium to large number of cars, is generally full throughtout working hours.",
            slots: 50
        },
        {
            id: 2,
            title: "Schevtschenka st.",
            description: "No description provided.",
            slots: 75
        }
    ]);

    function addNewItem(item) {
        let new_items = list_items.slice();
        new_items.push(item);
        setItems(new_items);
    }

    function  removeSpecifiedItem(itemId) {
        let new_items = list_items
            .filter((parking) => parking.id !== itemId);
        setItems(new_items);
    } 

    function  editSpecifiedItem(itemId) {
        let new_items = list_items.slice();
        new_items.push(itemId);
        setItems(new_items);
    } 
    

    const context = {
        items: list_items,
        addItem: addNewItem,
        setItem: editSpecifiedItem,
        removeItem: removeSpecifiedItem
    };
    

    return (
        <ParkingContext.Provider value={context}>
            {props.children}
        </ParkingContext.Provider>
    );
}

export default ParkingContext;