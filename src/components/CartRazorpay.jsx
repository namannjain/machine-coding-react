import React, { useEffect, useState } from 'react'

const CartRazorpay = ({ state, dispatch }) => {
  const { cart } = state;
  const [total, setTotal] = useState();

  const changeQty = (id, qty) => dispatch({
    type: "CHANGE_CART_QTY",
    payload: {
      id: id,
      qty: qty,
    },
  });

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => {
      return acc + Number(curr.price) * curr.qty;
    }, 0));
  }, [cart]);

  return (
    <div style={{
      width: '20%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <b>Cart</b>
      <b>Subtotal: ${total}</b>
      <div>
        {cart.length > 0 ?
          cart.map((prod) => {
            return (
              <div key={prod.id} style={{
                display: 'flex',
                padding: 10,
                border: '1px solid black',
                margin: 5,
                justifyContent: 'space-between'
              }}>
                <div style={{display: 'flex', gap: 10}}>
                  <img src={prod.thumbnail} alt={prod.title} style={{width:70, objectFit:'cover'}}/>
                  <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
                    <span>{prod.title}</span>
                    <b>$ {prod.price}</b>
                  </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <button onClick={() => changeQty(prod.id, prod.qty - 1)}>-</button>
                  <span>{prod.qty}</span>
                  <button onClick={() => changeQty(prod.id, prod.qty + 1)}>+</button>
                </div>
              </div>
            )
          })
          :
          <span style={{padding:20, alignSelf:'center'}}>Cart is empty</span>
        }
      </div>
    </div>
  )
}

export default CartRazorpay