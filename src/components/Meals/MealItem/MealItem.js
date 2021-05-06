
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import MealItemForm from './MealItemForm';
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCxtObj = useContext(CartContext);
  const itemAdd = amount => {
    cartCxtObj.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
    });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div><MealItemForm onAddItem = {itemAdd}/></div>
    </li>
  );
};

export default MealItem;
