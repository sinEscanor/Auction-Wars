import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { useGetAuctionsQuery } from "../store/AucService";

const Auctions = () => {
  // const auction: any = useSelector((state: any) => state.Auction.auctions);

  const { data, isLoading, error } = useGetAuctionsQuery();

  // const products: Product[] = useSelector(
  //   (state: any) => state.Product.products
  // );
  if (isLoading) return <Loader />;

  const auction = data?.auction || [];

  const CurrentAuctions: Auction[] = auction.filter(
    (auction: any) => auction.status != "Ended"
  );

  if (error) return <h1>Error...</h1>;

  return (
    <div className="flex gap-6 justify-center m-5 flex-wrap">
      {CurrentAuctions.map((product: Auction, index: number) => {
        // const {_id, title, description, photo, date, initialBid, duration, status, highestBid} = product
        return <ProductCard key={index} {...product} />;
      })}
    </div>
  );
};

export default Auctions;
