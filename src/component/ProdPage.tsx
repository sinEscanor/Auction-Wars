import ProdCard from "./ProdCard";
import Loader from "./Loader";

import { useGetProductsQuery } from "../store/ProductService";

const ProdPage = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1>Error...</h1>;

  const products = data?.products || [];
  console.log("Products: ", products);

  return (
    <div className="flex gap-6 justify-center m-5 flex-wrap">
      {Array.isArray(products) ? (
        products.map((product: Product) => (
          <ProdCard key={product._id} {...product} />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProdPage;
