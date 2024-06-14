"use client";

import ProductCard from "@c/Product/Card";
import { Grid } from "@mui/material";
import api from "@u/services/api";
import { Product } from "@u/types";
import { useEffect, useState } from "react";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products/");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
