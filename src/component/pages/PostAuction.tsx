import { useState, ChangeEvent } from "react";
// import axios from 'axios'
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Select, MenuItem } from "@mui/material";
import { PostAuction } from "../../store/AuctionSlice";

import {
  usePostAuctionMutation,
  useGetAuctionsQuery,
} from "../../store/AucService";

interface prod {
  startDate: Date;
  duration: number;
}

const PostAuctionPage = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();

  console.log(productId);

  const { refetch } = useGetAuctionsQuery();

  const [postAuction, { isLoading, isError, isSuccess, data, error }] =
    usePostAuctionMutation();

  const navigate = useNavigate();

  const [auction, setAuction] = useState<AuctionRequest>({
    productId: String(productId),
    startDate: new Date(),
    duration: 5 * 60,
  });
  const [duration, setDuration] = useState(5);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuction((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    postAuction(auction);
    refetch();
    toast.success("Auction posted successfully");
    console.log(auction);

    // dispatch(PostAuction(auction));
    // navigate("/");
  };

  const durationSelectHandler = (e: any) => {
    setDuration(e.target.value);
    setAuction((prevState) => ({
      ...prevState,
      duration: e.target.value * 60,
    }));
    console.log(auction.duration);
    console.log(duration);
  };

  if (isLoading) return <h1>Loading...</h1>;
  // if (isSuccess) {
  //   toast.success("Auction posted successfully");
  //   // navigate("/");
  // }
  if (isError) {
    console.log(error);
  }

  if (isError) return <h1>Error..</h1>;

  return (
    <div>
      <div className="w-full  flex justify-center my-3  ">
        <div className="w-[700px] bg-zinc-800 p-10 rounded-2xl">
          <h1 className="text-2xl">Enter the details of Auction</h1>
          <form
            onSubmit={submitHandler}
            className="[&>*]:rounded [&>*]:my-3 [&>*]:p-2 flex flex-col text-black"
          >
            {/* <input
              className=""
              onChange={changeHandler}
              name="title"
              type="text"
              placeholder="Enter the title"
            /> */}

            {/* <input className='' onChange={changeHandler} name='photo' type="text"  placeholder='Upload your image'/>  */}
            {/* <input className='my-3 p-2'  type="text" placeholder='Upload your photo' />  */}
            {/* <input
              className=""
              onChange={changeHandler}
              name="description"
              type="text"
              placeholder="Enter the description of the project"
            />

            <input
              className=""
              onChange={changeHandler}
              name="initialBid"
              type="number"
              placeholder="Enter the initial bid"
            /> */}

            <input
              className=""
              onChange={changeHandler}
              name="startDate"
              type="date"
            />
            {/* <div>
              <label className="  text-base p-3 mx-4 bg-white" htmlFor="photo">
                Choose the image of the product
              </label>

              <input
                className=""
                onChange={imgChangeHandler}
                name="photo"
                type="file"
                placeholder="Choose the image of the product"
              />
            </div> */}

            <Select
              size="small"
              name="duration"
              labelId="demo-simple-select-label"
              className="bg-white  text-black text-2xl"
              id="demo-simple-select"
              value={duration}
              // label="Select the duration"
              onChange={durationSelectHandler}
            >
              <MenuItem value={5}>5 minutes</MenuItem>
              <MenuItem value={10}>10 minutes</MenuItem>
              <MenuItem value={30}>30 minutes</MenuItem>
              <MenuItem value={60}> 1 Hour</MenuItem>
              <MenuItem value={120}>2 Hour</MenuItem>
            </Select>

            <button
              className="my-4 p-2 w-[30%] bg-amber-600 text-2xl text-white"
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAuctionPage;
