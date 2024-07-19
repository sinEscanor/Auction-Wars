import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import {
  useGetAuctionQuery,
  useStartAuctionMutation,
} from "../../store/AucService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetAuctionQuery(id || "");

  const auction = data?.auction || null;

  const UserState = useSelector((state: any) => state.Authenticate.user);
  const user: User | null = UserState?.user || null;

  const [
    startAuctionMutation,
    {
      isLoading: isStartAucLoading,
      isError: isStartAucError,
      isSuccess: isStartAucSuccess,
      error: startAucError,
    },
  ] = useStartAuctionMutation();

  const startAuction = async () => {
    try {
      await startAuctionMutation(String(auction?._id));
      toast.success("Auction started successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to start the auction");
    }
  };

  if (isLoading) return <Loader />;
  if (error) console.log(error);
  if (error) return <h1>Error...</h1>;

  return (
    <div className="m-5 flex flex-col md:flex-row gap-4 items-center ">
      {auction?.product?.photo ? (
        <img
          src={auction.product.photo}
          className="md:w-[58%] h-[80vh] object-cover rounded-lg"
          alt="Auction"
        />
      ) : (
        <div className="md:w-[58%] h-[80vh] flex items-center justify-center border rounded-lg">
          No image available
        </div>
      )}

      <div>
        <h1 className="text-3xl capitalize">{auction?.product?.title}</h1>
        <p>{auction?.product?.description}</p>
        <div className="pb-6">
          <p>Host: {auction?.creater?.name}</p>
          <p>Minimum bid: {auction?.product?.initialBid}</p>
        </div>

        <div className="relative">
          {auction?.status === "Upcoming" &&
          auction.creater?._id === user?._id ? (
            <button
              className="bg-amber-600 px-8 py-2 rounded-3xl my-3"
              onClick={startAuction}
              disabled={isStartAucLoading}
            >
              {isStartAucLoading ? "Starting..." : "Start the Auction"}
            </button>
          ) : auction?.status === "Upcoming" ? (
            <button className="bg-amber-600 px-8 py-2 rounded-3xl my-3">
              Not started
            </button>
          ) : (
            <button
              className="bg-amber-600 px-8 py-2 rounded-3xl my-3"
              onClick={() => navigate(`/auction/${id}`)}
            >
              Go to the Auction
            </button>
          )}
          {isStartAucError && (
            <p className="text-red-500">Error starting the auction</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
