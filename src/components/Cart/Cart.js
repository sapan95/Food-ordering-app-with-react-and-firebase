import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCxtObj = useContext(CartContext);
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issubmitted, setIsSubmitted] = useState(false);
  const removeItemHandler = (id) => {
    cartCxtObj.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCxtObj.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxtObj.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          amount={item.amount}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderHandler = () => {
    setCheckout(true);
  };

  const orderAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        Close
      </button>
      {cartCxtObj.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitCheckout = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-app-314c9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCxtObj.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCxtObj.clearItem();
  };

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCxtObj.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitCheckout} onCancel={props.onClick} />
      )}
      {!isCheckout && orderAction}
    </React.Fragment>
  );

  const modalSubmittingContent = <p>Sending order data...</p>
  const modalSubmittedContent = 
  <React.Fragment>
    <p>Successfully order sent!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClick}>
        Close
      </button>
    </div>
  </React.Fragment>;
  return <Modal onClick={props.onClick}>
    {!isSubmitting && !issubmitted && cartModalContent}
    {isSubmitting && modalSubmittingContent}
    {issubmitted && modalSubmittedContent}
  </Modal>;
};

export default Cart;
