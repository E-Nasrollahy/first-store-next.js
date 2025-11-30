import type { Discount } from "@/types/DiscountType"

export async function getDiscountByCode(code:string) {
    const res = await fetch(`http://localhost:3002/discounts?code=${code}`)
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    const data = (await res.json()) as Discount[]
    return data
}