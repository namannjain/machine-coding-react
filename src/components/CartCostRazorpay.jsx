import React, { useEffect, useReducer } from 'react'
import { cartReducer } from '../reducers/cartReducer';
import ProductsRazorpay from './ProductsRazorpay';
import CartRazorpay from './CartRazorpay';

const CartCostRazorpay = () => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const getData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Error!", err);      
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("https://dummyjson.com/products");
      console.log(data.products);
      dispatch({
        type: "ADD_PRODUCTS",
        payload: data.products,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="cart-cost-calculator" style={{display: 'flex'}} >
      <ProductsRazorpay state={state} dispatch={dispatch} />
      <CartRazorpay state={state} dispatch={dispatch} />
    </div>
  )
}

export default CartCostRazorpay