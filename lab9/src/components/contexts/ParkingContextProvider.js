import { useState, createContext, useEffect } from "react";
import {getParkingList, postParking, deleteParking, updateParking } from "../../requests";

const ParkingContext =  createContext({
    items: [],
    filteredItems: [],
    filters: null,
    currentItem: null,
    addItem: (item) => {},
    removeItem: (itemId) => {},
    setCurrentItem: (newItem) => {},
    setFilters: (filters) => {}
});



export function ParkingContextProvider(props) {

    const [list_items, setItems] =  useState([]);
    const [filtersObject, setFiltersObject] =  useState({});
    const [current, setCurrent] = useState(null);
    const [shoudUpdate, setUpdate] = useState(false);

    useEffect(() => { async function fetchData() {
        try {
            setItems([]);
            const data = await getParkingList(filtersObject);
            setItems(data);
        } catch(exc) {
            console.log(exc);
        }
    }; fetchData(); }, [shoudUpdate, filtersObject])

    async function addNewItem(item) {
        await postParking(item)
        context.update();
    }

    async function removeSpecifiedItem(itemId) {
        await deleteParking(itemId);
        context.update();
    }


    const context = {
        items: list_items,
        filters: filtersObject,
        currentItem: current,
        addItem: addNewItem,
        removeItem: removeSpecifiedItem,
        setCurrentItem: setCurrent,
        setFilters: setFiltersObject,
        update: () => setUpdate(!shoudUpdate),
    };
    

    return (
        <ParkingContext.Provider value={context}>
            {props.children}
        </ParkingContext.Provider>
    );
}

export default ParkingContext;