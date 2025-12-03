import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import NumberStepper from "./NumberStepper";
import { useEffect, useState } from "react";
import { Product } from "@/types/ProductType";
import { getProductById } from "@/services/ProductsServices";

interface ICartItemProps {
  id: string;
  qty: number;
}

const CartItem = ({ id, qty }: ICartItemProps) => {
  const [data, setData] = useState<Product>();

  useEffect(() => {
    async function fetchData() {
      const productData = await getProductById(id);
      setData(productData);
    }
    fetchData();
  }, [id]);

  return (
    <div className="grid grid-cols-12 gap-x-4 bg-gray-300 p-3 rounded-lg">
      <div className="col-span-3 flex items-center justify-center">
        <Avatar className="w-52 h-52">
          <AvatarImage
            src={data?.image}
            alt="@evilrabbit"
            className="rounded-full wfull h-full object-cover"
          />
        </Avatar>
      </div>
      <div className="col-span-9 flex flex-col gap-3">
        <p className="font-bold text-lg">{data?.title}</p>
        <p>{data?.description}</p>
        <span className="bg-gray-400 w-max p-1 rounded-md">
          {data?.price} $
        </span>
        <p>numder : {qty}</p>
        <NumberStepper id={id} />
      </div>
    </div>
  );
};

export default CartItem;
