import styles from "./Checkout.module.css"
import { Form, Formik, useField } from "formik"
import * as Yup from "yup"
import validateCard from "card-validator" 
import Button from "../basic/Button"
import { useNavigate } from "react-router-dom"

const FormikInputField = ({label, ...props}) => {
    const [field, meta] = useField(props)

    return  (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <br/>
            <input className={styles.text_input} {...field} {...props}/>
            {
                meta.touched && meta.error ? (
                    <div className={styles.error}>{meta.error}</div>
                ) : null
            }
        </>
    )
}

const FormikCheckBox = ({children, ...props}) => {
    const [field, meta] = useField(props, "checkbox")

    return  (
        <>
            <div className={styles.checkbox}>
                <input type="checkbox" {...field} {...props}/>
                {children}
            </div>
            {
                meta.touched && meta.error ? (
                    <div className={styles.error}>{meta.error}</div>
                ) : null
            }
        </>
    )
}

export default function Checkout() {
    const navigate = useNavigate();
    return (
        <div className={styles.checkout}>
            <h1>Enter your debit card</h1>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    debitCard: "",
                    date: "",
                    cvc: "",
                    terms: false
                }}
                validationSchema={Yup.object({
                    name: Yup
                        .string()
                        .optional(),
                    email: Yup
                        .string()
                        .email("This is not a valid email")
                        .required("You need email to receive receipt"),
                    debitCard: Yup
                        .string()
                        .test(
                            "card-number", 
                            "The card number is invalid!", 
                            value => validateCard.number(value).isValid)
                        .required("Enter your card number"),
                    date: Yup
                        .date()
                        .required("Enter your card date"),
                    cvc: Yup
                        .string()
                        .length(3, "Code must be 3 digits long")
                        .matches(
                            '^[0-9]+$',
                            "CVC must contain only numbers"
                        )
                        .required("Enter your CVC"),
                    terms: Yup
                        .boolean()
                        .oneOf([true], "You must accept the terms first!")
                        .required()
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => { navigate("/checkout-success"); return true}}
            >
                {props =>
                    <Form>
                        <FormikInputField label="name" name="name" type="text"/><br/>
                        <FormikInputField label="email" name="email" type="email"/><br/>
                        <FormikInputField label="debit card" name="debitCard" type="text"/><br/>
                        <FormikInputField label="date" name="date" type="date"/><br/>
                        <FormikInputField label="cvc" name="cvc" type="text"/><br/>
                        <FormikCheckBox name="terms"><br/>
                            Accept the terms and conditions
                        </FormikCheckBox><br/>
                        <Button type="submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</Button>
                    </Form>
                }
            </Formik>
        </div>
    )
}