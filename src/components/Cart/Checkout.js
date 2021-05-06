import { useRef, useState } from "react";
import classes from './Checkout.module.css';

const fieldNotEmpty = value => value.trim() !== '';
const fieldHasSixChar = value => value.trim().length === 6;

const Checkout = (props) => {
  const inputNameRef = useRef();
  const inputStretRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
      name: true,
      street: true,
      postalCode: true,
      city: true
  })

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredStret = inputStretRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredCity = inputCityRef.current.value;

    const nameValidity = fieldNotEmpty(enteredName);
    const streetValidity = fieldNotEmpty(enteredStret);
    const postalValidity = fieldHasSixChar(enteredPostal);
    const cityValidity = fieldNotEmpty(enteredCity);

    setFormInputValidity({
      name: nameValidity,
      street: streetValidity,
      postalCode: postalValidity,
      city: cityValidity
    })

    const formValidity = nameValidity && streetValidity && postalValidity && cityValidity;

    if(formValidity){
        props.onConfirm({
            name: enteredName,
            street: enteredStret,
            postalCode: enteredPostal,
            city: enteredCity
        })
    }

  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref = {inputNameRef}/>
        {!formInputValidity.name && <p>Enter valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref = {inputStretRef}/>
        {!formInputValidity.street && <p>Enter valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref = {inputPostalRef}/>
        {!formInputValidity.postalCode && <p>Enter valid postal code(6)!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref = {inputCityRef}/>
        {!formInputValidity.city && <p>Enter valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;