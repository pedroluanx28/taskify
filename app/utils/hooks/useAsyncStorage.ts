import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage() {
    async function getItem(key: string) {
        try {
            const value = await AsyncStorage.getItem(key);

            if (value !== null && value !== undefined) {
                return value;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function setItem(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeItem(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        getItem,
        setItem,
        removeItem,
    };
}