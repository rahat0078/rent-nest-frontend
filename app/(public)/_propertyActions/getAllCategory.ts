import { fetcher } from "@/lib/fetcher"


export const getSingleProperty = async () => {
    const result = await fetcher(`/api/category`, {
        next: {
            revalidate: 60 * 60,
            tags: ["get-all-categories"]
        }
    })
    return result
}