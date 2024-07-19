import Auctions from "../Auctions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import OnGoingAuction from "../OnGoingAuction";
import { useNavigate } from "react-router-dom";
import ProdPage from "../ProdPage";

import { getToken } from "../../utils/authutils";
import { AuctionActions } from "../../store/AuctionSlice";
import Loader from "../Loader";

import { useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { data: products, error, isLoading } = useGetProductsQuery();
  // console.log(products, error, isLoading);

  const auctionLoading = useSelector((state: any) => state.Auction.isLoading);

  // const postAuctionSuccess = useSelector(
  //   (state: any) => state.Auction.isPostAucSuccess
  // );
  // const postAuctionError = useSelector(
  //   (state: any) => state.Auction.isSingleAucError
  // );
  // const postAuctionErrorMsg = useSelector(
  //   (state: any) => state.Auction.isPostAucErrMsg
  // );
  // const singleAucLoading = useSelector(
  //   (state: any) => state.Auction.isSingleAuctionLoading
  // );

  const handleClose = () => {
    dispatch(AuctionActions.readjustLoading());
  };
  const handleCloseError = () => {
    dispatch(AuctionActions.readjustError());
  };

  const token = getToken();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  if (auctionLoading) return <Loader />;

  return (
    <>
      {/* {singleAucLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center">
          <div className="max-w-[1900px]">
            {postAuctionSuccess && (
              <Snackbar
                open={postAuctionSuccess}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  variant="filled"
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Auction posted successfully!
                </Alert>
              </Snackbar>
            )}
            {postAuctionError && (
              <Snackbar
                open={postAuctionError}
                autoHideDuration={3000}
                onClose={handleCloseError}
              >
                <Alert
                  onClose={handleClose}
                  variant="filled"
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {postAuctionErrorMsg.message}
                </Alert>
              </Snackbar>
            )} */}
      {/* {postAuctionError && <Alert variant="outlined" severity="error">
        This is an error alert — check it out!
      </Alert>} */}
      <div>
        <div className="flex lg:flex-row  flex-col justify-between mx-3 lg:mx-10 my-20 ">
          <div className="text-[27px] lg:text-[40px] py-16">
            <h1>
              Get ready to <span className="text-amber-500">bid</span>,
            </h1>
            <h1>
              {" "}
              ignite the thrill of{" "}
              <span className="text-amber-500">auctions!</span>
            </h1>
          </div>
          <OnGoingAuction />
        </div>
        {/* <ProdPage /> */}
        <Auctions />
      </div>
    </>
  );
  //   )}
  // </>
};

export default Home;
