export type cardContextType = {
  id: number,
  qty: number
}
export type CardItemsContextValue = {
  cardItems: cardContextType[],
  setCardItems: React.Dispatch<React.SetStateAction<cardContextType[]>>,
  handelIncrease: (id: number) => void,
  handelDecrease: (id: number) => void,
  handelRemoveProduct: (id: number) => void,
  totalqtyCard: number,
  totalPrice: number,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
};

