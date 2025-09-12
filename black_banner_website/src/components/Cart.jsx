import React from 'react';

const Cart = ({ cartOpen, setCartOpen }) => {
  if (!cartOpen) {
    return null;
  }

  return (
    <div id="cart-modal" className="modal" style={{display: 'block'}}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Shopping Cart</h2>
          <span className="close" onClick={() => setCartOpen(false)}>&times;</span>
        </div>
        <div className="modal-body">
          <div id="cart-items">
            <p style={{textAlign: 'center', color: '#999', padding: '2rem'}}>Your cart is empty</p>
          </div>
          <div className="cart-total">
            <strong>Total: $<span id="cart-total">0.00</span></strong>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" id="clear-cart">Clear Cart</button>
          <button className="btn-primary" id="checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
