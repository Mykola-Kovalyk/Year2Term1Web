import styles from "./Home.module.css"
import Button from "../basic/Button"
import Loader from "../basic/Loader"
import ParkingContext from "../contexts/ParkingContextProvider";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Home(props) {
    const navigate = useNavigate();

    return (
        <div className={styles.home}>
            <div className={styles.preview}>
                <img className={styles.background} src="/parking.jpg" alt="parking"/>
                <div className={styles.inner}>
                    <div className={styles.text}>
                        <h1>parking with ease</h1>
                        See how easy it is to find your place.
                        <br/>
                        <br/>
                        <br/>
                        Search among several local parking facilities to find 
                        where to leave your car while you shop.
                        <br/>
                        <br/>
                        <br/>
                        Find and book the one you like the most.
                    </div>  
                </div>
            </div> 
            
            <Preview/>
    
            <div className={styles.book_now}>
                <center>
                    <h1>find your parking spot now</h1>
                    Search for numerous parkings with a click of a button
                    <br/>
                    <br/>
                    <br/>
                    <Button className={styles.view_button} onClick={() => navigate(`/catalog/filter`)}>
                        View Parkings
                    </Button>
                </center>
            </div>
        </div>
    )
}



function Preview(props) {
    const context = useContext(ParkingContext);
    const [catalogLength, setCatalogLength] = useState(3);


    let previewList = []

    for (let i = 0; i < Math.min(context.items.length, catalogLength) ; i++) {
        previewList.push(context.items[i]);
    }

    return (
        <div>
            
                {previewList.length > 0 ? 
                <div className={styles.catalog}>
                    {previewList.map(item => <CatalogItem key={item.id} element={item}/>)}
                </div> : 
                <div style={{margin: "auto"}}>
                    { catalogLength > 0 && <Loader/>}
                </div>}
            
            <center>
                <Button onClick={() => { if(catalogLength < context.items.length) setCatalogLength(catalogLength + 3); }}>
                    View more
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={() => { if(catalogLength > 0) setCatalogLength(catalogLength - 3);}}>
                    View less
                </Button>
            </center>
        </div>
    );
}

function CatalogItem(props) {
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