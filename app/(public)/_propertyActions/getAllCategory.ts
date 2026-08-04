import { fetcher } from "@/lib/fetcher"
import { ICategory } from "@/types/category"


export const getAllCategory = async () => {
    const result = await fetcher<ICategory[]>(`/api/category`, {
        next: {
            revalidate: 60 * 60,
            tags: ["get-all-categories"]
        }
    })
    return result
    
}