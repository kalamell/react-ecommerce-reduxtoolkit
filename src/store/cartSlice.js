import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

const cartSlice =  createSlice({
    'name': 'cart',
    initialState: {
        cartopen: false,
        cart: [],
        total: 0,
        amount: 0,
    },
    reducers: {
        getTotal: (state, action) => {
            const total = state.cart.reduce((ac, ct) => {
                return ac + ct.price * ct.amount
              },0);

              return {...state, total}


        },
        getAmount: (state, action) => {
            const amount = state.cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount;
            }, 0);

            return {...state, amount}

        },
        openCart: (state, action) => {
            state.cartopen = action.payload.open;

        },
        emptyCart: (state, action) => {
            state.cart = [];
        },
        removeFromCart: (state, action) => {
            const id = action.payload.id;
            const newCart = state.cart.filter(item => {
                return item.id !== id
            })
            return { ...state, cart: newCart };
            

        },
        increseAmount: (state, action) => {
            const id = action.payload.id;
            const cartItem = state.cart.find((item) => {
                return item.id === id;
            });
            const newCart = [...state.cart].map(item => {
                if (item.id === id) {
                    return {...item, amount: cartItem.amount + 1}
                } else {
                    return item;
                }
            });

            return { ...state, cart: newCart };
            
            
        },

        decreaseAmount: (state, action) => {
            const id = action.payload.id;
            const cartItem = state.cart.find((item) => {
                return item.id === id;
            });
            if (cartItem) {
                if (cartItem.amount == 1) {
                    const newCart = state.cart.filter(item => {
                        return item.id !== id
                    })
                    return { ...state, cart: newCart };
                } else {
                    const newCart = state.cart.map(item => {
                        if(item.id === id) {
                            return {...item, amount: cartItem.amount - 1}
                        } else {
                            return item;
                        }
                    });
                    return { ...state, cart: newCart}
                }
            }

        },

        addToCart: (state, action) => {

            const id = action.payload.id;
            const product = action.payload.product;
            const newItem = {...product, amount: 1}

            const cartItem = state.cart.find(item => {
                return item.id === id 
            });

            if (cartItem) {
                const newCart = [...state.cart].map(item => {
                    if (item.id === id) {
                        return {...item, amount: cartItem.amount + 1}
                    } else {
                        return item;
                    }
                });

                return { ...state, cart: newCart };
                
            } else {
                
                return {...state, cart: [newItem, ...state.cart] }
                
            }
        }
    }
});

export const { addToCart, openCart, emptyCart, removeFromCart, increseAmount, decreaseAmount, getTotal, getAmount } = cartSlice.actions;

export default cartSlice.reducer;