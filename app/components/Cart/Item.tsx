"use client";

import { Button, ListItem, ListItemText } from "@mui/material";
import { useCart } from "@u/context/Cart";
import { CartItem } from "@u/types";

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <ListItem>
      <ListItemText
        primary={item.product.name}
        secondary={`Quantity: ${item.quantity} - Options: ${item.options
          .map((opt) => opt.name)
          .join(", ")}`}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => removeFromCart(item.product.id)}
      >
        Remove
      </Button>
    </ListItem>
  );
};

export default CartItemComponent;
