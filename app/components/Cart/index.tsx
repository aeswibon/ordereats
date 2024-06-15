"use client";

import { queryClient } from "@a/provider";
import { Button } from "@c/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@c/ui/card";
import { Input } from "@c/ui/input";
import { Label } from "@c/ui/label";
import { RadioGroup, RadioGroupItem } from "@c/ui/radio-group";
import { Separator } from "@c/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@c/ui/table";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCart } from "@u/services/cart";
import { order } from "@u/services/order";
import { toast } from "react-toastify";
import CartItem from "./Item";

const Cart = () => {
  const { data: cart, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const total = Number(
    cart!
      .reduce((total, item) => {
        const optionsTotal = item.selected_options.reduce(
          (optTotal, option) => optTotal + Number(option.surcharge),
          Number(item.product.base_price)
        );
        return total + optionsTotal * item.quantity;
      }, 0)
      .toFixed(2)
  );

  const tax = Number((0.14 * total).toFixed(2));
  const orderMutation = useMutation({
    mutationKey: ["order"],
    mutationFn: () => order(cart!, total, tax),
    onSuccess: () => {
      toast.success("Order placed successfully");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  if (isFetching || !cart) {
    return <CircularProgress />;
  }

  return (
    <main className="flex-1 grid md:grid-cols-2 gap-8 p-4 md:p-8 lg:p-12">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-gray-500 dark:text-gray-400">
              Subtotal: ${total}
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="payment">Payment Method</Label>
                <RadioGroup id="payment" defaultValue="credit">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="credit" value="credit" />
                    <Label htmlFor="credit">Credit Card</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="paypal" value="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="promo">Promo Code</Label>
                <div className="flex gap-2">
                  <Input id="promo" placeholder="Enter promo code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="grid gap-2 w-full">
              <div className="flex w-full items-center justify-between">
                <div>Subtotal</div>
                <div>${total}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Taxes</div>
                <div>${(0.14 * total).toFixed(2)}</div>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Total</div>
                <div>${total * 1.14}</div>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => orderMutation.mutate()}
              >
                Place Order
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Cart;
