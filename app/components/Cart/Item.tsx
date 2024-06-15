"use client";

import { queryClient } from "@a/provider";
import { Button } from "@c/ui/button";
import { TableCell, TableRow } from "@c/ui/table";
import { useMutation } from "@tanstack/react-query";
import { removeFromCart } from "@u/services/cart";
import { ICartItem } from "@u/types";
import Image from "next/image";
import { toast } from "react-toastify";

interface CartItemProps {
  item: ICartItem;
}

const CartItem = (props: CartItemProps) => {
  const { item } = props;

  const basePrice = item.selected_options.reduce(
    (total, option) => total + Number(option.surcharge),
    Number(item.product.base_price)
  );

  const removeMutation = useMutation({
    mutationFn: () => removeFromCart(item.product.id),
    onSuccess: () => {
      toast.success("Removed one quantity from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Image
            src={item.product.image}
            alt={item.product.name}
            width={64}
            height={64}
            className="rounded-md"
          />
          <div>
            <div className="font-medium">{item.product.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.selected_options.map((option) => option.name).join(", ")}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>${basePrice}</TableCell>
      <TableCell>${(basePrice * item.quantity).toFixed(2)}</TableCell>
      <TableCell>
        <Button variant="destructive" onClick={() => removeMutation.mutate()}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
