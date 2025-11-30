"use client";

import { useCardItems, useHandels } from "@/app/context/CardItemsContext";
import { Button } from "./ui/button";

const NumberStepper = ({ id }: { id: number }) => {
  const [ handelIncrease, handelDecrease , handelRemoveProduct] = useHandels();
  const [cardItems] = useCardItems();
  const qty = cardItems.find((item) => item.id === id)?.qty ?? 0;

  return (
    <>
    <div className="flex gap-3 items-center">
      <Button className="cursor-pointer" onClick={() => handelIncrease(id)}>
        +
      </Button>
      <span>{qty}</span>
      <Button className="cursor-pointer" onClick={() => handelDecrease(id)} disabled={qty === 0}>-</Button>
    </div>
    <Button className="bg-red-500 text-white" onClick={()=> handelRemoveProduct(id)}>remove item</Button>
    </>
  );
};

export default NumberStepper;
