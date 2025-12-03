"use client";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useCardItems } from "../context/CardItemsContext";
import { useFeachAllProducts } from "@/Hook/useFeachAllProducts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFeachDiscountByCode } from "@/Hook/useFeachDiscountByCode";
import { ApiError } from "../lib/apiError";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postNewOrder } from "@/services/OrderServices";
import { Order } from "@/types/OrderType";

//function to generate random id for coumpilet order
const makeRandom = () => Math.floor(Math.random() * 100).toString();

const ShoppingCart = () => {
  const [code, setCode] = useState<string>("");
  const { data: discount, error: errorDiscount } = useFeachDiscountByCode(code);
  const InputRef = useRef<HTMLInputElement>(null);
  const [flagOrder, setFlagOrder] = useState(false);
  const [cartItems, setCardItems] = useCardItems();
  const { data, error: errorAllProduct } = useFeachAllProducts();

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = data?.find((p) => p.id == item.id.toString());
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const finalTotal = totalPrice.toFixed(2);

  // Apply discount if available
  const discountPrice = useMemo(() => {
    return discount?.[0]?.amount ?? 0;
  }, [discount]);

  // Calculate final price after discount
  const finalPrice = discountPrice
    ? totalPrice - (totalPrice * discountPrice) / 100
    : finalTotal;

  //function to handle discount code application
  const handelDiscount = () => {
    const value = InputRef.current?.value.trim() || "";
    if (value.length === 0) {
      alert("please fill input");
      return;
    }
    setCode(value);
  };

  //function to proceed to checkout
  const proceedToCheckout = () => {
    setFlagOrder(true);
  };
  //order handling
  const [newOrder, setNewOrder] = useState<Order>({
    id: makeRandom(),
    cardItems: cartItems,
    status: "Pending",
    username: "",
    address: "",
  });
  //function to handle order input changes
  const handleChangeOrder = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewOrder({
      ...newOrder,
      [name]: value,
    });
  };

  //function to post new order
  const handlePostNewOrder = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const created = await postNewOrder(newOrder);
      console.log("Created Order:", created);
      setNewOrder({
        id: "0",
        cardItems: [],
        status: "Pending",
        username: "",
        address: "",
      });
      setCardItems([]);
      setFlagOrder(false);
    } catch (err) {
      console.error(err);
    }
  };

  //error handling
  useEffect(() => {
    if (errorAllProduct) {
      ApiError(errorAllProduct.message);
    }
    if (errorDiscount) {
      ApiError(errorDiscount.message);
    }
  }, [errorAllProduct, errorDiscount]);

  return (
    <div className="flex flex-col gap-4 my-8">
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

      <div className="flex justify-center items-center">
        <div className="shadow border flex flex-col justify-center p-4 rounded-lg bg-zinc-100">
          <p>Total Price : {finalTotal}</p>
          <p>Discount Percentage : %{discountPrice} </p>
          <p>Final Price : {finalPrice}</p>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              className="bg-zinc-200 rounded-lg border-0 min-w-80 px-2"
              ref={InputRef}
            />
            <Button onClick={handelDiscount}>Discount Code</Button>
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={proceedToCheckout}
          className="bg-blue-500 text-white"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
      {flagOrder && (
        <div className="flex justify-center items-center w-full">
          <form className="flex flex-col gap-4 w-1/2 p-4 border rounded-lg bg-zinc-200 shadow">
            <div className="flex flex-col gap-2">
              <p className="font-bold">user order</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">username :</Label>
              <Input
                onChange={handleChangeOrder}
                id="username"
                name="username"
                className="bg-white"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">address :</Label>
              <Textarea
                onChange={handleChangeOrder}
                id="address"
                name="address"
                className="bg-white"
              />
            </div>
            <Button
              onClick={(e) => handlePostNewOrder(e)}
              className="mt-3 cursor-pointer"
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
