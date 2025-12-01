export type cardContextType = {
  id: string,
  qty: number
}
export type CardItemsContextValue = {
  cardItems: cardContextType[],
  setCardItems: React.Dispatch<React.SetStateAction<cardContextType[]>>,
  handelIncrease: (id: string) => void,
  handelDecrease: (id: string) => void,
  handelRemoveProduct: (id: string) => void,
  totalqtyCard: number,
  totalPrice: number,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
};

