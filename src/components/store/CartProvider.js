import React, {useReducer} from 'react';
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
    let updatedItems = [...state.items];
    let updatedTotalAmount = 0;
    if(action.type === 'ADD'){        
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        if(existingItemIndex >= 0){
            //updatedItems = [...state.items];
            updatedItems[existingItemIndex].amount = updatedItems[existingItemIndex].amount + action.item.amount;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }        
        updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    }
    else if(action.type === 'REMOVE'){
        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        updatedTotalAmount = state.totalAmount - updatedItems[existingItemIndex].price;
        if(updatedItems[existingItemIndex].amount === 1){
            updatedItems.splice(existingItemIndex, 1);
        }
        else{
            updatedItems[existingItemIndex].amount -= 1;
        }

    }
    else if(action.type === 'CLEAR'){
        return {items: [], totalAmount: 0};
    }
    return {items: updatedItems, totalAmount: updatedTotalAmount};
}
const CartProvider = props => {
    const defaultContext = {
        items: [],
        totalAmount: 0
    }
    const [cartState, cartDispatch] = useReducer(cartReducer, defaultContext);
    const addItemHandler = item =>{
        cartDispatch({type: 'ADD', item: item});
    }
    const removeItemHandler = id =>{
        cartDispatch({type: 'REMOVE', id: id});
    }
    const clearItemHandler = () => {
        cartDispatch({type: 'CLEAR'});
    }
    const contextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearItem: clearItemHandler
    }
    return(
        <CartContext.Provider value = {contextValue}>
            {props.children}
        </CartContext.Provider>
    );

}

export default CartProvider