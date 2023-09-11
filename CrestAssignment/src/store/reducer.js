import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    productList: [],
    cart:[],
    viewType:"grid"
} ;

export const appStoreSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload.productList;
        },
        setCart: (state, action) => {
            state.cart = action.payload.cart;
        },
        setViewType: (state, action) => {
            state.viewType = action.payload.viewtype;
        },
        setProductInventory : (state, action) =>{
            state.viewType = action.payload.viewtype;
        }
    },
});

// Selectors
export const getProductList = (state) => state.productList;
export const getCart = (state) => state.cart;
export const getViewType = (state) => state.viewType;

// Reducers and actions
export const { setProductList , setCart , setViewType } = appStoreSlice.actions;

export default appStoreSlice.reducer;