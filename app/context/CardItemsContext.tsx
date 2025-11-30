"use client";

import {
  cardContextType,
  CardItemsContextValue,
} from "@/types/cardContextType";
import { Local } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

const CardItemsContext = createContext<CardItemsContextValue | undefined>(
  undefined
);

export function CardItemsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cardItems, setCardItems] = useState<cardContextType[]>([]);

  useEffect(() => {
    const saved = Local.get<cardContextType[]>("cartItems");
    if (!saved) return;
    Promise.resolve().then(() => setCardItems(saved));
  }, []);
  useEffect(() => {
    Local.set("cartItems", cardItems);
  }, [cardItems]);

  function handelIncrease(id: number) {
    setCardItems((prev) => {
      const isExitItem = prev.find((item) => item.id === id) == null;

      if (isExitItem) {
        return [...prev, { id, qty: 1 }];
      } else {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
    });
  }
  function handelRemoveProduct(id: number) {
    setCardItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }
  function handelDecrease(id: number) {
    setCardItems((prev) => {
      const isLastOne = prev.find((item) => item.id === id)?.qty === 1;

      if (isLastOne) {
        return prev.filter((item) => item.id !== id);
      } else {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        );
      }
    });
  }

  const totalqtyCard = cardItems.reduce((acc, item) => acc + item.qty, 0);
  return (
    <CardItemsContext.Provider
      value={
        {
          cardItems,
          setCardItems,
          handelIncrease,
          handelDecrease,
          handelRemoveProduct,
          totalqtyCard,
        } as CardItemsContextValue
      }
    >
      {children}
    </CardItemsContext.Provider>
  );
}

export function useCardItems(): [
  cardContextType[],
  React.Dispatch<React.SetStateAction<cardContextType[]>>
] {
  const { cardItems, setCardItems } = useContext(
    CardItemsContext
  ) as CardItemsContextValue;
  return [cardItems, setCardItems];
}
export function useTotalqty(): number {
  const { totalqtyCard } = useContext(
    CardItemsContext
  ) as CardItemsContextValue;
  return totalqtyCard;
}
export function useHandels(): ((id: number) => void)[] {
  const { handelIncrease, handelDecrease, handelRemoveProduct } = useContext(
    CardItemsContext
  ) as CardItemsContextValue;
  return [handelIncrease, handelDecrease, handelRemoveProduct];
}
