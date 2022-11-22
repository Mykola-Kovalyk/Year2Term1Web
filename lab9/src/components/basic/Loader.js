import styles from "./Loader.module.css"

export default function Loader(props) {
    return (
        <div className={styles.loader}>{props.children}</div>
    )
}