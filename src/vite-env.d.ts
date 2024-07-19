/// <reference types="vite/client" />

interface User {
  _id?: string;

  name: string;
  email: string;
  __v?: number;

  // Add other fields as necessary
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface Product {
  _id?: string;
  title: string;
  description: string;
  photo: string | undefined;
  initialBid: number;
  creater?: string;
  __v?: number;
}

interface AuctionRequest {
  productId: string;
  startDate: Date;
  duration: number;
}

interface Auction {
  _id: string;
  product: Product;
  startDate: Date;
  duration: number;
  creater: string | User | any;
  bidders: string[];
  status: string;
  highestBid: number;
  __v: number;
}

interface AuctionResponse {
  auction: Auction;
}
