import { cardContextType } from "./cardContextType";

export interface Order {
	id: string,
	cardItems: cardContextType[],
	status: "Pending" | "Completed" | "Cancelled",
	username: string,
    address : string,
}
