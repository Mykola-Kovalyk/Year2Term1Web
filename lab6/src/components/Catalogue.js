import styles from "./Catalogue.module.css"
import { useContext, useState } from "react"
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
        <div className={styles.catalogue}>
            <div className={styles.catalogue_filters}>
                <h2>See what's available</h2>

                **Work in progress**

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
            <div className={styles.catalogue_list}>
                {context.items.map(parking => <CatalogueElement key={parking.id} element={parking}/>)}
            </div>
        </div>
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