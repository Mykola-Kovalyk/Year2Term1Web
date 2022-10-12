import styles from "./Home.module.css"
import Preview from "./Preview"
import PreviewCatalog from "./PreviewCatalog"
import BookNow from "./BookNow"

export default function Home(props) {
    return (
        <div className={styles.home}>
            <Preview />
            <PreviewCatalog/>
            <BookNow />
        </div>
    )
} 