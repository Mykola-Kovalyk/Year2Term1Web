import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../basic/Button";
import ParkingContext from "../../contexts/ParkingContextProvider";
import styles from "./Details.module.css"



export default function Details(props) {
    const context = useContext(ParkingContext);
    const element =  context.currentItem;
    const navigate =  useNavigate();

    if(element === null) {
        return null
    }

    return (
        <div className={styles.item}>
            <div className={styles.image}/>
            <div className={styles.text}>
                <div>
                    <h2>{element.title}</h2>
                    {element.description}
                </div> 
                <div>     
                    <h4>slots: {element.slots}</h4>
                    <Button onClick={() => navigate("/catalog")}>
                        Go Back
                    </Button>  
                </div>
            </div>        
        </div>
    );
}