import NavLink from "./basic/NavLink"
import Button from "./basic/Button"
import styles from "./Header.module.css"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Header(props) {
    const [updateState, update] = useState(false)
    const data = useSelector((state) => state.items.someVar);
    const navigate =  useNavigate();

    let loginData = window.localStorage.loginData
    let loggedIn = !(loginData == null)

    const logOut = () => {
        window.localStorage.removeItem("loginData")

    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <b>ParkingPlace</b> 
            </div>
            <div className={styles.nav}>
                <NavLink className={styles.link} link="/home">Home</NavLink>
                <NavLink className={styles.link} link="/catalog/filter">Catalog</NavLink>
                <NavLink className={styles.link} link="/cart">Cart</NavLink>
            </div>
            <div className={styles.see_parkings}>
                <Button onClick={() => {if(loggedIn) { logOut() } navigate("/login"); update(!updateState)}}>
                    {loggedIn ? "Log Out" : "Log In"}
                </Button>
            </div>
        </header>
    );
}