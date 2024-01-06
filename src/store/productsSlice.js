import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    return data;
  })
const productsSlice = createSlice({
    'name': 'products',
    initialState: {
        isLoading: false,
        products: [],
        product: null,
        error: false,
    },
    reducers: {
        getProduct: (state, action) => {
            const id = action.payload.id;
            const cartItem = state.products.find((item) => {
                return item.id === id;
            });

            return {...state, product: cartItem}

        }

    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products =  action.payload;
            state.product = null;
        });

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.error = true;
        });
    }
});

export const { getProduct } = productsSlice.actions;

export default productsSlice.reducer;