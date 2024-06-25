import axios from "axios";
import { useAsyncStorage } from "./useAsyncStorage";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationScreens } from "../../routes/app.routes";

export function useApi() {
    const { getItem, removeItem } = useAsyncStorage();
    const navigation = useNavigation<NavigationScreens>();
    const getToken = getItem("token");
    const [token, setToken] = useState("");

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    getToken.then((value) => {
        if (value) {
            setToken(value);
        }
    });

    const api = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    async function logout() {
        try {
            await api.post("/logout");

            removeItem("token");
            setTimeout(() => {
                navigation.navigate("Login");
            }, 200);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        api,
        logout,
    };
}