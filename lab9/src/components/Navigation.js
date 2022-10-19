import Catalog from "./pages/Catalog";
import { ParkingContextProvider } from "./contexts/ParkingContextProvider";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Details from "./pages/Details";
import Home from "./pages/Home";

export default function Navigation(props) {

    const navigation = useNavigate();
    const path = useLocation();

    useEffect(() => { if(path.pathname === "/") { navigation("/home"); } });

    return (
        <ParkingContextProvider>
            <Routes>
                <Route path="/" element={""}/>
                <Route path="/home/*" element={
                    <Home/>
                }/>
                <Route path="/catalog/*" element={
                    <Catalog />
                }/> 
                <Route path="/item/*" element={
                    <Details />
                }/>
                <Route path="/bookings/*" element={""}/> 
            </Routes>
        </ParkingContextProvider>
    );
}