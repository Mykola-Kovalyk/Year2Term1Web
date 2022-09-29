import BookNow from "./BookNow";
import Catalogue from "./Catalogue";
import { ParkingContextProvider } from "./contexts/ParkingContextProvider";
import styles from "./Navigation.module.css"
import Preview from "./Preview"

export default function Navigation(props) {
    return (
        <div>
            <ParkingContextProvider>
                <Preview />
                <BookNow />

                <Catalogue />
            </ParkingContextProvider>      
        </div>
    );
}