import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import { AuctionSlice } from "./AuctionSlice";
import { productServiceApi } from "./ProductService";
import { aucServiceApi } from "./AucService";
import { userServiceApi } from "./UserService";
import ProductSlice from "./ProductSlice";

const store = configureStore({
  reducer: {
    Authenticate: UserSlice.reducer,
    Auction: AuctionSlice.reducer,
    Product: ProductSlice,
    [userServiceApi.reducerPath]: userServiceApi.reducer,
    [productServiceApi.reducerPath]: productServiceApi.reducer,
    [aucServiceApi.reducerPath]: aucServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userServiceApi.middleware,
      productServiceApi.middleware,
      aucServiceApi.middleware,
    ]), // Add middleware to the store
});

export default store;
