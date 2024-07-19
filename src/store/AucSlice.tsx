import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuction } from "./AuctionService";

interface AuctionState {
  auctions: Auction[];
}

const initialState: AuctionState = { auctions: [] };

const AuctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    getAuctions(state, action: PayloadAction<Auction[]>) {
      state.auctions = action.payload;
    },

    postAuction(state, action: PayloadAction<Auction>) {
      state.auctions.push(action.payload);
    },
  },
});

// export const { getAuctions, postAuction } = AuctionSlice.actions;
