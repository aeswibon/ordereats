"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@c/ui/select";
import { Separator } from "@c/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@c/ui/table";
import { Textarea } from "@c/ui/textarea";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@u/services/cart";
import CartItem from "./Item";

const Cart = () => {
  const { data: cart, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isFetching || !cart) {
    return <CircularProgress />;
  }

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const optionsTotal = item.selected_options.reduce(
          (optTotal, option) => optTotal + Number(option.surcharge),
          Number(item.product.base_price)
        );
        return total + optionsTotal * item.quantity;
      }, 0)
      .toFixed(2);
  };

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
              Subtotal: ${calculateTotal()}
            </div>
            <Button variant="outline">Update Cart</Button>
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
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 555-5555" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="123 Main St, Anytown USA" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Anytown" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">Zip</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>
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
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div>Subtotal</div>
                <div>$59.98</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Taxes</div>
                <div>$4.80</div>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Total</div>
                <div>$64.78</div>
              </div>
              <Button size="lg" className="w-full">
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
