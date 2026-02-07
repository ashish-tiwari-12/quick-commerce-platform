import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartProduct'   // 👈 cart slice
import orderReducer from './orderSlice'   // 👈 order slice

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,   // 👈 KEY NAME MUST MATCH selector
    order: orderReducer
  },
})
