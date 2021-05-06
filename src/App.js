import React, {useState} from "react";
import Header from "./components/Layout/Hearder";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from './components/store/CartProvider';
function App() {
  const [showCartModal, setShowCartModal] = useState(false);

  const showCartHandler = () => {
    setShowCartModal(true);
  }

  const hideCartHandler = () => {
    setShowCartModal(false);
  }

  return (
    <CartProvider>
      {showCartModal && <Cart onClick = {hideCartHandler}/>}
      <Header onClick = {showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
