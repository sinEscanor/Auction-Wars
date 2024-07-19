import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
}
const initialState: ProductState = { products: [] };

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    postProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
  },
});

export const { getProducts, postProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
