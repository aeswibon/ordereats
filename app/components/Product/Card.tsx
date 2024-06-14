"use client";

import { Button, Card, CardContent, Typography } from "@mui/material";
import { Product } from "@u/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2">
          ${product.base_price.toFixed(2)}
        </Typography>
        <Link href={`/product/${product.id}`} passHref>
          <Button variant="contained" color="primary">
            View
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
