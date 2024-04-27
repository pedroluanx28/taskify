import axios from "axios";
import { useAsyncStorage } from "./useAsyncStorage";
import { useState } from "react";

export function useApi() {
    const { getItem, removeItem } = useAsyncStorage();
    const getToken = getItem("token");
    const [token, setToken] = useState("");

    getToken.then((value) => {
        if (value) {
            setToken(value);
        }
    });

    const api = axios.create({
        baseURL: "http://192.168.18.158:8000/api",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    async function logout() {
        try {
            await api.post("/logout");

            removeItem("token");
        } catch (error) {
            console.error(error);
        }
    }

    return {
        api,
        logout,
    };
}