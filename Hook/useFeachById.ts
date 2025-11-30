"use client"
import { useQuery } from "@tanstack/react-query"

import type { Product } from "@/types/ProductType"
import { getProductById } from "@/services/ProductsServices"

export const useFeachById = (id : string) => {
    return useQuery<Product>({
        queryKey: ['product'],
        queryFn: getProductById.bind(null, id),
        enabled:!!id,
    })
}