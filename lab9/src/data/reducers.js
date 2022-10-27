import { createSlice } from "@reduxjs/toolkit"


const itemSlice = createSlice({
    name: "items",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            let newItem =  { item: action.payload, time: 60 };
            state.cart.push(newItem);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((entry) => entry.item.id !== action.payload.id)
        },
        setTime(state, action) {
            let foundItem = state.cart.find((entry) => entry.item.id === action.payload.item.id)
            foundItem.time = action.payload.time; 
        },
        clearCart: (state) => {
            state.cart = []
        }
    }
});

export const { addToCart, removeFromCart, clearCart, setTime } = itemSlice.actions;
export default itemSlice.reducer;