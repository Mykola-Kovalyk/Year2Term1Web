import styles from "./BookNow.module.css"
import Button from "./basic/Button"
import { Link } from "react-router-dom";

export default function BookNow(props) {
    return (
        <div className={styles.book_now}>
            <center>
                <h1>find your parking spot now</h1>
                Search for numerous parkings with a click of a button
                <br/>
                <br/>
                <br/>
                <Link to="/list/filter">
                    <Button className={styles.search_button} text="Search"/>
                </Link>
            </center>
        </div>
    );
}