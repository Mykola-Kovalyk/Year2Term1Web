import { Link } from "react-router-dom";
import styles from "./NavLink.module.css"


export default function NavLink(props) {
    return (
        <div className={`${styles.link} ${props.className}`}>
            <Link className={styles.a} to={props.link}>
                {props.children}
            </Link>
        </div>
    );
}