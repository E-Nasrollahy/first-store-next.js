import { Order } from "@/types/OrderType"

export async function postNewOrder(newOrder: Order) {
    const res = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
    })
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    const data = (await res.json()) as Order
    return data
}
export async function getAllOrders() {
    const res = await fetch("http://localhost:3002/orders")
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    const data = (await res.json()) as Order[]
    return data
}