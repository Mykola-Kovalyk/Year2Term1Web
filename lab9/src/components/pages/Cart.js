import React, { useRef } from 'react'
import styles from "./Cart.module.css"
import { useSelector, useDispatch } from "react-redux"
import { setTime } from '../../data/reducers';
import Button from '../basic/Button';

function Cart() {
    const cart =  useSelector((state) => state.items.cart);
    return (
        <div className={styles.cart}>
            <div className={styles.cart_list}>
                {cart.map(entry => <CartItem key={entry.item.id} element={entry.item} time={entry.time}/>)}
            </div>
            <div className={styles.checkout}>
                <h2>Checkout</h2>
                You are about to purchase service for these parkings.
                <br/><br/>
                <Button>
                    Continue
                </Button>
            </div>
        </div>
    )
}

function CartItem(props) {
    const timeRef = useRef();
    const dispatch = useDispatch();
    return (
        <div className={styles.cart_item}>
            <div className={styles.item_title}>
                {props.element.title}
            </div>
            <div className={styles.item_time}>
                <Button onClick={() => dispatch(setTime({ item: props.element, time: props.time - 1 }))}>-</Button>
                <div 
                    ref={timeRef} 
                    suppressContentEditableWarning="true" 
                    className={styles.item_time_value} 
                    contentEditable="true" 
                    onInput={
                        () => dispatch(setTime({ item: props.element, time: parseInt(timeRef.current.innerText) }))
                    }>
                    {props.time}
                </div>
                <Button onClick={() => dispatch(setTime({ item: props.element, time: props.time + 1 }))}>+</Button>
            </div>
        </div>
    )
}

export default Cart