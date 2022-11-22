import styles from "./CheckoutSuccess.module.css"

export default function CheckoutSuccess() {
    return (
        <div className={styles.checkout_success}>
            <center><h1>Success!</h1>
            Now wait until you receive the receipt by email
            </center>
        </div>
    )
}
