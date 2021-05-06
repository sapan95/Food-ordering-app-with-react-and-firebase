import Input from '../../UI/input';
import {useRef, useState} from 'react'
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const enteredAmountRef = useRef();
    const [enterdAmountValid, setEnterdAmountValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        const userEnteredAmt = enteredAmountRef.current.value;
        const amount = +userEnteredAmt;
        if(userEnteredAmt.trim().length === '0' || amount < 1 || amount > 5){
            setEnterdAmountValid(false);
            return;
        }
        if(!enterdAmountValid){
            setEnterdAmountValid(true);
        }
        props.onAddItem(amount);
    }
  return (
    <form className={classes.form} onSubmit = {submitHandler}>
      <Input
        label='Amount'
        ref = {enteredAmountRef}
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!enterdAmountValid && <p>Entered valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;