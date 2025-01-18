import React, { useReducer } from 'react';

// Initial state for the cart
const initialState = {
  cart: [],
};

// Reducer function to manage cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item is already in the cart
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Increase the quantity of the existing item
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Add a new item to the cart
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const handleAddToCart = item => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const handleIncreaseQuantity = id => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id } });
  };

  const handleDecreaseQuantity = id => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
  };

  const handleRemoveFromCart = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <h2>Products</h2>
      <div>
        <button onClick={() => handleAddToCart({ id: 1, name: 'Product A', price: 10 })}>
          Add Product A
        </button>
        <button onClick={() => handleAddToCart({ id: 2, name: 'Product B', price: 15 })}>
          Add Product B
        </button>
      </div>

      <h2>Cart</h2>
      {state.cart.length > 0 ? (
        state.cart.map(item => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            <span>
              {item.name} - ${item.price} x {item.quantity}
            </span>
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default App;
