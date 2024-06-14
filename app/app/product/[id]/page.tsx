"use client";
import OptionSelector from "@c/Common/OptionSelector";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useCart } from "@u/context/Cart";
import api from "@u/services/api";
import { Option, Product } from "@u/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const { addToCart } = useCart();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const response = await api.get(`/products/${id}/`);
        setProduct(response.data);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1, selectedOptions);
      router.push("/cart");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h5">${product.base_price.toFixed(2)}</Typography>
      <Grid container spacing={2}>
        {product.option_lists.map((optionList) => (
          <Grid item xs={12} key={optionList.id}>
            <OptionSelector
              optionList={optionList}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetail;
