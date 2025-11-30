"use client"
import { useQuery } from "@tanstack/react-query"

import type { Product } from "@/types/ProductType"
import { getAllProducts } from "@/services/ProductsServices"

export const useFeachAllProducts = () => {
    return useQuery<Product[]>({ 
        queryKey: ['products'], 
        queryFn: getAllProducts
    })
}