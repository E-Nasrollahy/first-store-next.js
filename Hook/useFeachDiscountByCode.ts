"use client"
import { useQuery } from "@tanstack/react-query"

import { getDiscountByCode } from "@/services/DiscountsServices"
import { Discount } from "@/types/DiscountType"

export const useFeachDiscountByCode = (code : string ) => {
    return useQuery<Discount[] | undefined>({
        queryKey: ['discount', code],
        queryFn: () => {
            if(code === "") {
                return Promise.resolve(undefined);
            }else{
                return getDiscountByCode(code);
            }
        },
        enabled:!!code,
    })
}