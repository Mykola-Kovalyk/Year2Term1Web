import styles from "./BookNow.module.css"
import Button from "./basic/Button"

export default function BookNow(props) {
    return (
        <div className={styles.book_now}>
            <center>
                <h1>find your parking spot now</h1>
                Search for numerous parkings with a click of a button
                <br/>
                <br/>
                <br/>
                <Button className={styles.search_button} text="Search"/>
            </center>
        </div>
    );
}