import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AuctionEnded from "../AuctionEnded";
import { Alert, Snackbar, Backdrop } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAuctionQuery } from "../../store/AucService";
import { io } from "socket.io-client";

const AucRoom = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAuctionQuery(id || "");
  const auction = data?.auction || null;

  const user = useSelector((state: any) => state.Authenticate.user.user);

  const [currentHighestBid, setCurrentHighestBid] = useState(0);
  const [currentBidder, setCurrentBidder] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [validBid, setValidBid] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [enteredBid, setEnteredBid] = useState(0);

  var socket: any;

  useEffect(() => {
    if (auction && user) {
      socket = io("http://localhost:5000/", {
        query: {
          roomId: auction._id,
          userId: user._id,
          name: user.name,
        },
      });

      socket.on("timer", (timer: any) => {
        const h = Math.floor(timer / 3600);
        const m = Math.floor((timer % 3600) / 60);
        const s = timer % 60;
        setSeconds(s);
        setMinutes(m);
        setHours(h);

        if (h <= 0 && m <= 0 && s <= 0) {
          socket.emit("auction-ended");
          setTimeout(() => {
            navigate("/");
          }, 5000);
          setIsEnded(true);
        }
      });

      socket.on("newhbid", (amount: number, bidder: string) => {
        setCurrentHighestBid(amount);
        setCurrentBidder(bidder);
      });

      socket.on("ended", () => {
        setIsEnded(true);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [auction, user, navigate]);

  const PlaceBid = () => {
    if (enteredBid <= currentHighestBid) return setValidBid(false);
    setValidBid(true);
    setCurrentHighestBid(enteredBid);
    socket.emit("newBid", { amount: enteredBid, userId: user._id });
  };

  const handleClose = () => {
    setValidBid(true);
  };

  const enterNewBidHandler = (e: any) => {
    setEnteredBid(Number(e.target.value));
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error:</h1>;

  return (
    <div className="m-5 flex-col md:flex-row flex items-center gap-4">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isEnded}
      >
        <AuctionEnded
          auction={auction}
          amount={currentHighestBid}
          bidder={currentBidder}
        />
      </Backdrop>
      {!validBid && (
        <Snackbar
          open={!validBid}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Entered bid is less than current highest bid!
          </Alert>
        </Snackbar>
      )}
      <img
        src={auction?.product?.photo}
        className="w-[58%] h-[500px] object-cover rounded-lg"
        alt="Product"
      />
      <div>
        <h1 className="text-3xl capitalize">{auction?.product.title}</h1>
        <p>{auction?.product.description}</p>
        <div className="pb-6">
          <p>Host: {auction?.creater.name}</p>
          <p>Minimum bid: {auction?.product.initialBid}</p>
        </div>
        <div
          className={`text-xl ${
            minutes < 1 && hours === 0 ? "text-red-500" : "text-blue-500"
          }`}
        >
          {hours} : {minutes} : {seconds} remaining
        </div>
        <h1 className="text-2xl font-bold pb-4">
          Current Highest bid: {currentHighestBid}$
        </h1>
        {auction?.creater._id === user._id ? (
          <button
            className="bg-amber-600 px-8 py-2 rounded-3xl my-3"
            onClick={() => {
              setIsEnded(true);
              socket.emit("auction-ended");
            }}
          >
            End Auction
          </button>
        ) : (
          <div className="relative">
            <span className="absolute text-black top-[18px] left-2 text-lg font-semibold">
              $
            </span>
            <input
              type="number"
              onChange={enterNewBidHandler}
              placeholder="Enter the amount"
              className="p-2 pl-5 text-black rounded-md mr-4"
            />
            <button
              className="bg-amber-600 px-8 py-2 rounded-3xl my-3"
              onClick={PlaceBid}
            >
              Bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AucRoom;
