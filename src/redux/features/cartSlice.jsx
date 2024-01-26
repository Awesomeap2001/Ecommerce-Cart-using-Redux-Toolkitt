import second, { createSlice } from '@reduxjs/toolkit';

const initialState = {
    carts: []
}

// Card Slice
const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        // add to cart
        addToCart: (state, action) => {
            const ItemIndex = state.carts.findIndex((item) => item.id === action.payload.id)        // check if product already present
            // if not present ItemIndex = -1(means not present) , Present = its index
            // console.log(ItemIndex)

            if (ItemIndex >= 0) {
                state.carts[ItemIndex].qnty += 1;
            } else {
                const temp = { ...action.payload, qnty: 1 }     // data of the product and change qnty value to 1
                state.carts = [...state.carts, temp]            // add the product to cart
            }

        },
        // Remove particular items
        removeFromCart: (state, action) => {
            const data = state.carts.filter((element) => element.id !== action.payload);        // not action.payload.id and why action.payload because we will only send id
            state.carts = data;
        },

        // decrement quantity
        decrementQuantity: (state, action) => {
            const ItemIndex_decrement = state.carts.findIndex((item) => item.id === action.payload.id)        // check if product already present

            if (state.carts[ItemIndex_decrement].qnty >= 1) {
                state.carts[ItemIndex_decrement].qnty -= 1
            }

        },

        // clear cart
        emptyCart: (state, action) => {
            state.carts = []
        }
    }
});

export const { addToCart, removeFromCart, decrementQuantity, emptyCart } = cartSlice.actions;

export default cartSlice.reducer; 