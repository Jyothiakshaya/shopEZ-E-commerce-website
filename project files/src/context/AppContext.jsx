import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  user: null,
  cart: [],
  favorites: [],
  orders: [],
  isAuthenticated: false,
};

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: [],
        orders: [],
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('shopez-cart');
    const savedFavorites = localStorage.getItem('shopez-favorites');
    const savedUser = localStorage.getItem('shopez-user');
    const savedOrders = localStorage.getItem('shopez-orders');

    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      cartItems.forEach((item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item.product });
      });
    }

    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      favorites.forEach((id) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
      });
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({ type: 'LOGIN', payload: user });
    }

    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      dispatch({ type: 'SET_ORDERS', payload: orders });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopez-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('shopez-favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('shopez-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('shopez-user');
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('shopez-orders', JSON.stringify(state.orders));
  }, [state.orders]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}