import { fetcher } from "@/lib/fetcher";
import { TRegisterUser } from "@/types/auth.types";


export const registerUser = async (data: TRegisterUser) => {
    return fetcher("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data)
    })
}