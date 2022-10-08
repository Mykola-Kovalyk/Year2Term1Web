import Button from "./basic/Button";
import styles from "./Preview.module.css"
import { useContext, useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import ParkingContext from "./contexts/ParkingContextProvider";

export default function Preview(props) {

    return (
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
    );
}
