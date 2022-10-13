import NavLink from "./basic/NavLink";
import styles from "./Footer.module.css"


export default function Footer(props) {
    return (
        <footer className={styles.footer}>
            <center>
                <div className={styles.background}>
                        <nav className={styles.useful_links}>
                            <NavLink link="">Privacy</NavLink>
                            <NavLink link="">Contact Me</NavLink>
                        </nav>
                </div>
                <div className={styles.copyright}>
                    Copyright "Mykola Kovalyk"
                </div>
            </center> 
        </footer>
    );
}