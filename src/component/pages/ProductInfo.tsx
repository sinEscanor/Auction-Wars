import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";
// import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
// import { io } from 'socket.io-client'
const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(GetAuction(id))
  // },[])
  let auction = useSelector((state: any) => state.Auction.singleAuction);
  // console.log(auction)
  // const isLoading = useSelector((state:any)=> state.Auction.isSingleAuctionLoading)
  // const isSuccess = useSelector((state:any)=> state.Auction.isSingleAucSuccess)
  const user = useSelector((state: any) => state.Authenticate.user);
  console.log(user.user._id);
  console.log(auction.creater._id);
  const startAuction = () => {
    const updateAuctionStatus = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const id = auction._id;
      await axios.patch(
        `https://auctionwars.onrender.com/api/auction/${id}`,
        {},
        config
      );
      // console.log(user.token)
      navigate(`/auction/${id}`);
      // await dispatch(GetAuction(auction._id))
      // await dispatch(GetAuctions())
      // auction = response.data.auction
    };
    updateAuctionStatus();
    // const socket = io('https://auctionwars.onrender.com/')
  };
  // {console.log(auction.bidders.length)}
  // console.log(auction.photo)
  return (
    <div className="m-5 flex flex-col md:flex-row gap-4 items-center ">
      <img
        src={auction.photo}
        className="md:w-[58%] h-[80vh] object-cover rounded-lg"
        alt="1"
      />

      <div>
        <h1 className="text-3xl capitalize">{auction.title}</h1>
        <p>{auction.description}</p>
        <div className="pb-6">
          <p>Host : {auction.creater.name}</p>
          <p>Minimumbid : {auction.initialBid}</p>
        </div>
        {/* <input type="range" /> */}

        {/* <h1 className='text-2xl font-bold pb-4'>Current Highest bid: {auction.highestBid}$</h1> */}

        <div className="relative ">
          {auction.staus == "Upcoming" &&
          auction.creater._id == user.user._id ? (
            <button
              className="bg-amber-600 px-8 py-2 rounded-3xl my-3"
              onClick={startAuction}
            >
              Start the Auction
            </button>
          ) : auction.staus == "Upcoming" ? (
            <button className="bg-amber-600 px-8 py-2 rounded-3xl my-3">
              Not started
            </button>
          ) : (
            <>
              <button
                className="bg-amber-600 px-8 py-2 rounded-3xl my-3"
                onClick={() => navigate(`/auction/${id}`)}
              >
                Go to the Auction
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

// : auction.creater._id == user.user._id
//                   ?<button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' >End Auction</button>
//
