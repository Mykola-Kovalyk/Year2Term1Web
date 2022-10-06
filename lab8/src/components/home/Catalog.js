import styles from "./Catalog.module.css"
import { useContext, useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import ParkingContext from "../contexts/ParkingContextProvider";
import Button from "../basic/Button";

export default function Catalogue(props) {
    const navigate = useNavigate();
    const path = useLocation();
    const context = useContext(ParkingContext);
    const [idCounter, setIdCounter] =  useState(3);

    function addNewitem() {
        let id = idCounter;
        let title = document.getElementsByClassName(styles.title)[0].value;
        let description = document.getElementsByClassName(styles.description)[0].value;
        let slots = parseInt(document.getElementsByClassName(styles.slots)[0].value);
        

        context.addItem({id, title, description, slots})
        setIdCounter(idCounter + 1);
    }

    function filterItems() {
        let searchString =  document.getElementsByClassName(styles.searchbar)[0].value;
        let filteredArray = context.items.filter( (facility) => facility.title.search(searchString) !== -1 ||  facility.description.search(searchString) !== -1) 
        context.setFilteredItems(filteredArray);
    }

    function goto(localPath) {
        navigate(`${path.pathname.replace(/\/[^/]*$/, "")}${localPath}`)
    }


    let catalogItems =  context.filters ?  context.filteredItems : context.items;

    let slotSum = 0
    for(const catalogItem of catalogItems) {
        slotSum += catalogItem.slots;
    }

    return (

                <div className={styles.catalogue}>
                    <div className={styles.catalogue_filters}>
                    <h2>See what's available</h2>
                            <Button className={styles.setting_add_button} text="Add" onClick={() => goto("/add")}/>
                            <Button className={styles.setting_filter_button} text="Filter"  onClick={() => goto("/filter")}/>
                            <Button className={styles.setting_exit_button} text="Exit"  onClick={() => navigate(".")}/>
                        <Routes>    
                            <Route path="/filter" element={
                                <div>
                                    <br/>
                                    <Button onclick={() => context.setFilteredItems(context.items.sort((a, b) => a.slots - b.slots))} text="Sort by number of slots"/>

                                    <h6>Search for:</h6>
                                    <input className={styles.searchbar} type="text" minLength="1" required />
                                    <br/>
                                    <br/>
                                    <Button onClick={filterItems} text="Search"/>
                                    <br/>
                                    <br/>
                                    <Button id="hero_data-field-cancel-filter" onClick={() => context.setFilteredItems(null)} text="Remove filters"/>
                                    <h6>Total amount of slots: {slotSum}</h6>
                                </div>
                            }/>
                            <Route path="/add" element={
                                <div>
                                    <h2>Add new parking facility</h2>                

                                    <h6>Title</h6>
                                    <input className={styles.title} type="text" minLength="1" required/>

                                    <h6>Description</h6>
                                    <textarea className={styles.description} type="text" minLength="1" required></textarea>

                                    <h6>Number of parking slots</h6>
                                    <input className={styles.slots} type="number" minLength="1" min="0" required/>
                                    <br/>
                                    <br/>
                                    <Button className={styles.add_button} text="Add" onClick={addNewitem}/>

                                </div>
                            }/>
                        </Routes>
                    </div>
                    <div className={styles.catalogue_list}>
                        {catalogItems.map(parking => <CatalogItem key={parking.id} element={parking}/>)}
                    </div>
                </div>
    );
}

function CatalogItem(props) {
    const context = useContext(ParkingContext);
    const navigate = useNavigate();
    return (
        <div className={styles.element}>
            <div className={styles.element_image}/>
            <div className={styles.element_text}>
                <h2>{props.element.title}</h2>
                {props.element.description}
                <h6>slots: {props.element.slots}</h6>     
            </div>
            <div className={styles.element_buttons}>
                {/*<Button className={styles.edit_button} text="Edit" onClick={() => context.setItem(props.element.id)}/>*/}
                <Button className={styles.remove_button} text="Remove" onClick={() => context.removeItem(props.element.id)} />
                <Button className={styles.edit_button} text="Details" onClick={() => { context.setCurrentItem(props.element); navigate(`/item/${props.element.id}`); }} />
            </div>
        </div>
    );
}