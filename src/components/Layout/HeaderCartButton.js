import React, {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HearderCartButton = props => {
    const cartCxtObj = useContext(CartContext);
    const [cartHighlight, setCartHighlight] = useState(false);
    const {items} = cartCxtObj;
    const bumpButton = `${classes.button} ${cartHighlight ? classes.bump : ''}`
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setCartHighlight(true);
        const timer = setTimeout(() => {
            setCartHighlight(false);
        }, 300);
        return(() => {
            clearTimeout(timer);
        })
    },[items])
    const numberOfItems = items.reduce((currentNum,item) => {
        return currentNum += item.amount;
    },0);

    return(
        <button className = {bumpButton} onClick = {props.onClick}>
            <span className = {classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className = {classes.badge}>
                {numberOfItems}
            </span>
        </button>
    );
}

export default HearderCartButton;