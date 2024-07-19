import { useEffect, useState } from "react";
import axios from "axios";
import profilepic from "../profile.png";

import { removeCookie } from "../../utils/authutils";
import { UserActions } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import SideBar from "../SideBar";
import PaginationContainer from "../PaginationContainer";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/authutils";

const ProfilePage = () => {
  const token = getToken();

  const [user, setUser]: any = useState({});
  const [auctionArray, setAuctionArray]: any = useState(null);
  // useEffect(() => {
  //   const getUser = async () => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const response = await axios.get(
  //       "https://auctionwars.onrender.com/api/auth/",
  //       config
  //     );

  //     setUser(response.data.user);
  //     setAuctionArray(response.data.user.postedAuctions);
  //   };
  //   getUser();
  // }, []);

  const PostedAuctionsHandler = () => {
    setAuctionArray(user.postedAuctions);
  };
  const AuctionsWonHandler = () => {
    setAuctionArray(user.purchasedItems);
  };
  const dispatch = useDispatch();
  const Logout = () => {
    removeCookie();
    dispatch(UserActions.logout());
  };
  return (
    // <div className="flex items-center justify-center">
    //   <div className="flex pl-16 max-w-[1900px] w-full flex-col md:flex-row gap-10 ">
    //     <div className="md:w-[40%] flex flex-col items-center pr-10 ">
    //       <img
    //         src={profilepic}
    //         alt="Pro"
    //         className="w-[150px] my-4 object-fill  bg-gray-700 rounded-[150%] h-[150px]"
    //       />
    //       <h1 className="text-4xl text-gray-500">{user.name}</h1>
    //       <h3 className="text-3xl">{user.email}</h3>
    //       <h3>{user.address}</h3>
    //       {/* <h2 >Products Auctioned: X</h2>
    //         <h2>Products Sold: Y</h2> */}
    //       <div className="my-2">
    //         <p
    //           className="py-2 px-10 cursor-pointer bg-zinc-800 rounded  my-2"
    //           onClick={PostedAuctionsHandler}
    //         >
    //           Auction Hosted
    //         </p>
    //         <p
    //           className="py-2 px-10 cursor-pointer  bg-zinc-800  rounded  "
    //           onClick={AuctionsWonHandler}
    //         >
    //           Auction Won
    //         </p>
    //       </div>
    //       <Link to={"/login"}>
    //         <button
    //           onClick={Logout}
    //           className="bg-amber-600 mt-3 rounded-lg p-2 px-4"
    //         >
    //           {" "}
    //           Logout{" "}
    //         </button>
    //       </Link>
    //     </div>

    //     <div className="w-full md:w-[60%]">
    //       {auctionArray && <PaginationContainer productArray={auctionArray} />}
    //     </div>
    //   </div>
    // </div>
    <>
      <SideBar />
    </>
  );
};

export default ProfilePage;
