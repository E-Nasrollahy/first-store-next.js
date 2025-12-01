"use client";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useCardItems } from "../context/CardItemsContext";
import { useFeachAllProducts } from "@/Hook/useFeachAllProducts";
import {useEffect, useMemo, useRef, useState } from "react";
import { useFeachDiscountByCode } from "@/Hook/useFeachDiscountByCode";
import { ApiError } from "../lib/apiError";

const ShoppingCart = () => {
  const [code, setCode] = useState<string>("");
  const { data: discount, error: errorDiscount } = useFeachDiscountByCode(code);
  const InputRef = useRef<HTMLInputElement>(null);
  const [cartItems] = useCardItems();
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
    <div className="flex flex-col gap-4">
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

      <div className="flex justify-between items-center">
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
        <div>
          <Button className="bg-blue-500 text-white">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
