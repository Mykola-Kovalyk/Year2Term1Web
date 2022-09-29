import BookNow from "./BookNow";
import styles from "./Navigation.module.css"
import Preview from "./Preview"

export default function navigation(props) {
    return (
        <div>
            <Preview />
            <BookNow />
        </div>
    );
}