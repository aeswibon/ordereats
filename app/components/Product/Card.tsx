"use client";

import { Button } from "@c/ui/button";
import { Checkbox } from "@c/ui/checkbox";
import { Label } from "@c/ui/label";
import { RadioGroup, RadioGroupItem } from "@c/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@c/ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@u/context/Auth";
import { addToCart } from "@u/services/cart";
import { IOption, IProduct } from "@u/types";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = (props: ProductCardProps) => {
  const { isAuthenticated } = useAuth();
  const { product } = props;

  const [radioOption, setRadioOption] = useState({} as IOption);
  const [selectedOptions, setSelectedOptions] = useState([] as IOption[]);
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: () =>
      addToCart(product.id, quantity, [...selectedOptions, radioOption]),
    onSuccess: () => {
      toast.success("Added to cart");
    },
  });

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-500 mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-xl">${product.base_price}</span>
        </div>
        <div className="mb-2">
          {product.option_lists.map((option) => (
            <div key={option.id}>
              <Label htmlFor={option.name} className="block font-medium mb-2">
                {option.name}
              </Label>
              {option.selection_type === "must_select_one" && (
                <RadioGroup
                  id={option.name}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4"
                >
                  {option.options.map((opt) => (
                    <Label
                      key={opt.id}
                      htmlFor={`${option.name}-${opt.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <RadioGroupItem
                        id={`${option.name}-${opt.id}`}
                        value={opt.id.toString()}
                        onClick={() => setRadioOption(opt)}
                      />
                      {opt.name} (+${opt.surcharge})
                    </Label>
                  ))}
                </RadioGroup>
              )}
              {option.selection_type === "can_select_multiple_or_none" && (
                <div className="flex flex-wrap gap-2 pb-2">
                  {option.options.map((opt) => (
                    <Label
                      key={opt.id}
                      htmlFor={`${option.name}-${opt.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        id={`${option.name}-${opt.id}`}
                        value={opt.id.toString()}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedOptions((prev) => [...prev, opt]);
                          } else {
                            setSelectedOptions((prev) =>
                              prev.filter((item) => item.id !== opt.id)
                            );
                          }
                        }}
                      />
                      {opt.name} (+${opt.surcharge})
                    </Label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="grid grid-cols-5 w-full max-w-sm justify-center items-center gap-4 mb-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full py-2"
                  disabled={!isAuthenticated}
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </Button>
                <span className="inline-flex justify-center items-center col-span-3 h-full text-center border border-gray-300 rounded-md">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full py-2"
                  disabled={!isAuthenticated}
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => mutation.mutate()}
                size="lg"
                className="w-full"
                disabled={!isAuthenticated}
              >
                Add to Cart
              </Button>
            </TooltipTrigger>
            {!isAuthenticated && (
              <TooltipContent>
                <p>Please login to add it to cart</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductCard;
