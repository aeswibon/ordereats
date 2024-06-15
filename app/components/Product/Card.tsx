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
import { useAuth } from "@u/context/Auth";
import { IProduct } from "@u/types";
import Image from "next/image";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = (props: ProductCardProps) => {
  const { isAuthenticated } = useAuth();
  const { product } = props;
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={product.image}
        alt="Pizza"
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
        <div className="mb-4">
          {product.option_lists.map((option) => (
            <div key={option.id}>
              <Label htmlFor={option.name} className="block font-medium mb-2">
                {option.name}
              </Label>
              {option.selection_type === "must_select_one" && (
                <RadioGroup
                  id={option.name}
                  defaultValue=""
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
                      />
                      {opt.name} (+${opt.surcharge})
                    </Label>
                  ))}
                </RadioGroup>
              )}
              {option.selection_type === "can_select_multiple_or_none" && (
                <div className="flex flex-wrap gap-2 pb-4">
                  {option.options.map((opt) => (
                    <Label
                      key={opt.id}
                      htmlFor={`${option.name}-${opt.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        id={`${option.name}-${opt.id}`}
                        value={opt.id.toString()}
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
              <Button size="lg" className="w-full" disabled={!isAuthenticated}>
                Add to Cart
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Please login to add it to cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductCard;
