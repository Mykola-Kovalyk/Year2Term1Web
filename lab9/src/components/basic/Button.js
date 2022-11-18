import styles from "./Button.module.css"


const Button = ({className, ...props}) => {
    return (
        <button className={`${styles.button} ${props.className}`} {...props}>{props.children}</button>
    );
}

export default Button;