import styles from "./Catalogue.module.css"
import { useContext, useState } from "react"
import { Routes, Route, useNavigation, Link } from "react-router-dom"
import ParkingContext from "./contexts/ParkingContextProvider";
import Button from "./basic/Button";

export default function Catalogue(props) {
    const context = useContext(ParkingContext);
    const [idCounter, setIdCounter] =  useState(3);

    function addNewitem() {
        let id = idCounter;
        let title = document.getElementsByClassName(styles.title)[0].value
        let description = document.getElementsByClassName(styles.description)[0].value
        let slots = parseInt(document.getElementsByClassName(styles.slots)[0].value)
        
        context.addItem({id, title, description, slots})
        setIdCounter(idCounter + 1);
    }

    return (
        <Routes>
            <Route path="/list/*" element={
                <div className={styles.catalogue}>
                    <div className={styles.catalogue_filters}>
                    <h2>See what's available</h2>
                        <Link to="/list/add">
                                <Button className={styles.setting_add_button} text="Add"/>
                        </Link>
                        <Link to="/list/filter">
                                <Button className={styles.setting_filter_button} text="Filter"/>
                        </Link>
                        <Link to="/">
                                <Button className={styles.setting_exit_button} text="Exit"/>
                        </Link>
                        <Routes>    
                            <Route path="/filter" element={
                                <div>
                                    <br/>
                                    <Button onclick={() => {}} text="Sort by number of slots"/>

                                    <h6>Search for:</h6>
                                    <input itype="text" minLength="1" required />
                                    <br/>
                                    <br/>
                                    <Button onClick={() => {}} text="Search"/>
                                    <br/>
                                    <br/>
                                    <Button id="hero_data-field-cancel-filter" onclick={() => {}} text="Remove filters"/>
                                    <h6>Total amount of slots: {0}</h6>
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
                        {context.items.map(parking => <CatalogueElement key={parking.id} element={parking}/>)}
                    </div>
                </div>
            }/>
        </Routes>
    );
}

function CatalogueElement(props) {
    const context = useContext(ParkingContext);
    return (
        <div className={styles.element}>
            <h2>{props.element.title}</h2>
            {props.element.description}
            <h6>slots: {props.element.slots}</h6>
            {/*<Button className={styles.edit_button} text="Edit" onClick={() => context.setItem(props.element.id)}/>*/}
            <Button className={styles.remove_button} text="Remove" onClick={() => context.removeItem(props.element.id)} />
        </div>
    );
}