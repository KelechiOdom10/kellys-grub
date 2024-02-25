import { FC } from "react";
import { Plus } from "~/components/icons/Plus";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Rating } from "~/components/ui/rating";
import { Product } from "~/types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const onSale = product.onSale;
  const discount = product.discountPercentage || 0;
  const discountPrice = (1 - discount / 100) * product.price;

  return (
    <div className="relative m-8 w-[240px] cursor-pointer rounded-2xl bg-white p-4 shadow-sm hover:outline hover:outline-brand-200">
      <div className="flex">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute -top-6 h-20 w-20 rounded-full bg-white drop-shadow-xl"
        />
        <div className="ml-auto flex-col items-start space-y-1.5">
          <Rating rating={4} />
          {onSale && (
            <Badge letterCase="upper" className="rotate-6">
              on sale
            </Badge>
          )}
        </div>
      </div>
      <h5 className="w-4/5 py-3 text-[15px]">{product.name}</h5>
      <div className="flex items-center justify-between">
        <Button intent="white" size="sm" rightIcon={<Plus />}>
          Add
        </Button>
        <div className="flex-col text-sm font-bold">
          <p className={`${onSale ? "line-through" : ""}`}>£{product.price.toFixed(2)}</p>
          {onSale && <p className="text-secondary">£{discountPrice.toFixed(2)}</p>}
        </div>
      </div>
    </div>
  );
};
