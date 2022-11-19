import Catalog from "./pages/Catalog";
import { ParkingContextProvider } from "./contexts/ParkingContextProvider";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ProtectedRoute from "./basic/ProtectedRoute";
import Login from "./pages/Login";

export default function Navigation(props) {

    const navigation = useNavigate();
    const path = useLocation();

    let loginData = window.localStorage.loginData
    let loggedIn = !(loginData == null)
    
    useEffect(() => { if(path.pathname === "/") { navigation("/home"); } });

    return (
        <ParkingContextProvider>
            <Routes>
                <Route path="/" element={""}/>
                <Route element={<ProtectedRoute isAuthenticated={loggedIn}/>}>
                    <Route path="/home/*" element={<Home />}/>
                </Route>
                <Route  element={<ProtectedRoute isAuthenticated={loggedIn}/>}>
                    <Route path="/catalog/*" element={<Catalog />}/>
                </Route>
                <Route element={<ProtectedRoute isAuthenticated={loggedIn}/>}>
                    <Route path="/item/*" element={<Details />}/>
                </Route>
                <Route element={<ProtectedRoute isAuthenticated={loggedIn}/>}>
                    <Route path="/cart/*" element={<Cart />}/>
                </Route>
                <Route element={<ProtectedRoute isAuthenticated={loggedIn}/>}>
                    <Route path="/checkout/*" element={<Checkout />}/>
                </Route>
                <Route element={<ProtectedRoute isAuthenticated={loggedIn}/>}>
                    <Route path="/checkout-success/*" element={<CheckoutSuccess />}/>
                </Route>
                <Route path="/login" element={
                    <Login />
                }/>

            </Routes>
        </ParkingContextProvider>
    );
}