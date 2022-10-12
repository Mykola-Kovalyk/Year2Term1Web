import styles from "./BookNow.module.css"
import Button from "../../basic/Button"
import { useNavigate } from "react-router-dom";

export default function BookNow(props) {
    const navigate = useNavigate();
    return (
        <div className={styles.book_now}>
            <center>
                <h1>find your parking spot now</h1>
                Search for numerous parkings with a click of a button
                <br/>
                <br/>
                <br/>
                <Button className={styles.view_button} onClick={() => navigate(`/catalog/filter`)}>
                    View Parkings
                </Button>
            </center>
        </div>
    );
}