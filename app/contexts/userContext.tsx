import { ReactNode, createContext, useEffect, useState } from "react";

import { useStorageVariables } from "../utils/hooks/useStorageVariables";
import { useAsyncStorage } from "../utils/hooks/useAsyncStorage";
import { useApi } from "../utils/hooks/useApi";

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
}

type ProviderProps = {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: ProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const { api } = useApi();
    const { TOKEN } = useStorageVariables();
    const { removeItem } = useAsyncStorage();

    async function me() {
        try {
            const { data } = await api.get("/me");

            setUser(data);
        } catch (error: any) {
            if (error.response.status === 401) {
                removeItem("token");
            }

            console.error(error);
        }
    }

    useEffect(() => {
        if (TOKEN) {
            me();
        }
    }, [TOKEN]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}