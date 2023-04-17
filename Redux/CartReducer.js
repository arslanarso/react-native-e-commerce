import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(item => item.id == action.payload.id);

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(item => item.id == action.payload.id);
      itemInCart.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(item => item.id == action.payload.id);
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cart.filter(
          item => item.id !== action.payload.id,
        );
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
  },
});

export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} =
  cartSlice.actions;

export default cartSlice.reducer;

// import {configureStore, createSlice} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cart: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const itemInCart = state.cart.find(item => item.id === action.payload.id);

//       if (itemInCart) {
//         itemInCart.quantity++;
//       } else {
//         state.cart.push({...action.payload, quantity: 1});
//       }
//     },
//     removeFromCart: (state, action) => {
//       const removeFromCart = state.cart.filter(
//         item => item.id !== action.payload.id,
//       );
//       state.cart = removeFromCart;
//     },
//     incrementQuantity: (state, action) => {
//       const itemInCart = state.cart.find(item => item.id === action.payload.id);
//       itemInCart.quantity++;
//     },
//     decrementQuantity: (state, action) => {
//       const itemInCart = state.cart.find(item => item.id === action.payload.id);
//       if (itemInCart.quantity === 1) {
//         const removeFromCart = state.cart.filter(
//           item => item.id !== action.payload.id,
//         );
//         state.cart = removeFromCart;
//       } else {
//         itemInCart.quantity--;
//       }
//     },
//   },
// });

// export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} =
//   cartSlice.actions;

// export default cartSlice.reducer;

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['cart'],
// };

// const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

// const store = configureStore({
//   reducer: {
//     cart: persistedReducer,
//   },
// });

// const persistor = persistStore(store);

// export {store, persistor};
