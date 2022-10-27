import NavLink from "./basic/NavLink"
import Button from "./basic/Button"
import styles from "./Header.module.css"
import { useSelector } from "react-redux"


export default function Header(props) {

    const data = useSelector((state) => state.items.someVar);

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
                <Button>
                    Login
                </Button>
            </div>
        </header>
    );
}