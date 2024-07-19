import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
import { GetAuction } from "../store/AuctionSlice";
import { useDispatch } from "react-redux";
interface Props {
  _id: string;
  title: string;
  description: string;
  photo: string;
  initialBid: number;
  creater: string;
  startDate: Date;
  duration: number;
  bidders: any;
  status: string;
  highestBid: number;
  __v: number;
}
const ProdCard = ({ _id, title, photo, initialBid }: Product) => {
  // const auction = useSelector((state:any)=>state.Auction.auctions)
  //   const date = new Date(startDate);
  // console.log(_id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navToAuctionRoom = () => {
    const fn = async () => {
      // await dispatch(GetAuction(_id));
      navigate(`/auction/post/${_id}`);
    };
    fn();
  };
  // 'https://auctionwars.onrender.com/3c8f9be0-2845-49b1-9f22-14becbf7c817.png'
  return (
    <div>
      <div className="relative">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/auction-wars-7ae9e.appspot.com/o/files%2F8dfa15c5-2cfa-4ad5-af97-15ce033eef73?alt=media&token=5766ddb7-9c25-4886-b527-eeb5922a2279"
          className="w-[270px]   h-[280px] rounded-md bg-cover bg-center relative text-center"
          alt="auction"
        ></img>
        <div className=" absolute bottom-0 left-0  bg-blur w-full  z-10 ">
          <h1 className="p-2">Auctions Starts on </h1>
        </div>
      </div>
      <div className="p-4 w-[270px] bg-zinc-800">
        <h1 className="text-xl">{title}</h1>
        <span>Initial Bid - {initialBid}$</span>

        <button
          onClick={navToAuctionRoom}
          className="w-full mt-1 rounded-full p-2 bg-gradient-to-r from-[#EC9F05] to-[#FF4E00]"
        >
          Create an Auction
        </button>
      </div>
    </div>
  );
};

export default ProdCard;
