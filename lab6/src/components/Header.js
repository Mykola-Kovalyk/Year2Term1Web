import LinkButton from "./basic/LinkButton"
import Button from "./basic/Button"
import styles from "./Header.module.css"


export default function Header(props) {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <b>ParkingPlace</b> 
            </div>
            <div className={styles.nav}>
                <LinkButton className={styles.link} text="Find" link="" />
                <LinkButton className={styles.link} text="Popular" link="" />
                <LinkButton className={styles.link} text="Book" link="" />
            </div>
            <div className={styles.see_parkings}>
                <Button text="Available Parkings"/>
            </div>
        </header>
    );
}