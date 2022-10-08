import styles from "./PreviewCatalog.module.css"
import { useContext, useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import ParkingContext from "./contexts/ParkingContextProvider";
import Button from "./basic/Button";

export default function PreviewCatalog(props) {
    const context = useContext(ParkingContext);
    const [catalogueLength, setCatalogueLength] = useState(3);


    let previewList = []

    for (let i = 0; i < Math.min(context.items.length, catalogueLength) ; i++) {
        previewList.push(context.items[i]);
    }

    return (
        <div>
            <div className={styles.catalog}>
                {previewList.length > 0 ? previewList.map(item => <CatalogItem key={item.id} element={item}/>) : <h6>No items provided</h6>}
            </div>
            <center>
                <Button text="View more" onClick={() => setCatalogueLength(catalogueLength + 3)}/>
                <br/>
                <br/>
                <Button text="View less" onClick={() => setCatalogueLength(catalogueLength - 3)}/>
            </center>
        </div>
    );
}



function CatalogItem(props) {
    const context = useContext(ParkingContext);
    return (
        <div className={styles.element}>
            <div className={styles.element_image}/>
            <div className={styles.element_text}>
                <h2>{props.element.title}</h2>
                {props.element.description}
                <h6>slots: {props.element.slots}</h6>     
            </div>
        </div>
    );
}