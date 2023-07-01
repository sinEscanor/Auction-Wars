import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import { AuctionSlice } from "./AuctionSlice";

const store = configureStore({
    reducer:{Authenticate: UserSlice.reducer, Auction: AuctionSlice.reducer }
})

export default store