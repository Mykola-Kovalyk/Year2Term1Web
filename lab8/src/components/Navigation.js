import BookNow from "./home/BookNow";
import Catalog from "./home/Catalog";
import { ParkingContextProvider } from "./contexts/ParkingContextProvider";
import styles from "./Navigation.module.css"
import Preview from "./Preview"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Item from "./Item";
import PreviewCatalog from "./PreviewCatalog";

export default function Navigation(props) {

    const navigation = useNavigate();
    const path = useLocation();

    useEffect(() => { if(path.pathname === "/") { navigation("/home");} }, []);

    return (
        <ParkingContextProvider>
            <Routes>
                <Route path="/" element={""}/>
                <Route path="/home/*" element={
                    <div>
                        <Preview />
                        <PreviewCatalog/>
                        <BookNow />
                    </div>
                }/>
                <Route path="/catalog/*" element={
                    <Catalog />
                }/> 
                <Route path="/item/*" element={
                    <Item />
                }/>
                <Route path="/bookings/*" element={""}/> 
            </Routes>
            
        </ParkingContextProvider>
    );
}