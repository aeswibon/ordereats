"use client";

import CartItem from "@c/Cart/Item";
import { Button, List, Typography } from "@mui/material";
import { useCart } from "@u/context/Cart";

const Cart = () => {
  const { cart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const optionsTotal = item.options.reduce(
          (optTotal: any, option: any) => optTotal + option.surcharge,
          0
        );
        return total + (item.product.base_price + optionsTotal) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      <Typography variant="h4">Cart</Typography>
      <List>
        {cart.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </List>
      <Typography variant="h5">Total: ${calculateTotal()}</Typography>
      <Button variant="contained" color="primary" onClick={clearCart}>
        Clear Cart
      </Button>
    </div>
  );
};

export default Cart;
