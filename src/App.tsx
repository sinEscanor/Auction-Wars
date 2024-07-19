import "./App.css";
import Login from "./component/pages/Login";
import AuctionRoom from "./component/pages/AuctionRoom";
import Register from "./component/pages/Register";
import ProfilePage from "./component/pages/ProfilePage";
import ProductInfo from "./component/pages/ProductInfo";
import PostAuctionPage from "./component/pages/PostAuction";
import PostProductPage from "./component/pages/PostProduct";
import ProdPage from "./component/ProdPage";
import Home from "./component/pages/Home";
import { useGetUserQuery } from "./store/UserService";
import AucRoom from "./component/pages/AucRoom";
import { Toaster } from "sonner";
import { getToken } from "./utils/authutils";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./component/Navbar";
import { UserActions } from "./store/UserSlice";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/userinfo" element={<ProfilePage />}></Route>

      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />}></Route>
        <Route
          path="/auction/post/:productId"
          element={<PostAuctionPage />}
        ></Route>
        <Route path="/product/post" element={<PostProductPage />}></Route>
        <Route path="/product" element={<ProdPage />}></Route>
        <Route path="/product/:id" element={<ProductInfo />}></Route>
        <Route path="/auction/:id" element={<AucRoom />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  const token = getToken();

  const { data, isLoading, error } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token && !isLoading && !error) {
      dispatch(UserActions.login(data));
    }
  }, [token, data, isLoading, error]);

  return (
    <div className=" text-white">
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
