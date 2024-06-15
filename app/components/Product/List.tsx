"use client";

import ProductCard from "@c/Product/Card";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@u/services/product";

const ProductList = () => {
  const { data: products, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isFetching || !products) {
    return <CircularProgress />;
  }

  return (
    <section className="w-full">
      <div className="container px-4 md:px-6 grid gap-10 items-start">
        <div className="grid gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Featured Foods
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Check out our latest food items and customize your meal.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
