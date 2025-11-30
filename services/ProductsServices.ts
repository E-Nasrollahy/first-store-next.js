import { DataListProduct, Product } from "@/types/ProductType"

export async function getPaginationAllProducts({page , per_page} : {page: string, per_page: string}) {
    const res = await fetch(`http://localhost:3002/products?_page=${page}&_per_page=${per_page}`)
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    const data = (await res.json()) as DataListProduct
    return data
}
export async function getAllProducts() {
    const res = await fetch("http://localhost:3002/products")
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    const data = (await res.json()) as Product[]
    return data
}
export async function getProductById(id: string) {
    const res = await fetch(`http://localhost:3002/products/${id}`)
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    const data = (await res.json()) as Product
    return data
}