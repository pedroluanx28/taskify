import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useApi } from "../../utils/hooks/useApi";
import { NavigationScreens } from "../../routes/app.routes";
import { useEffect, useState } from "react";

export function Home() {
    const [tasks, setTasks] = useState<PaginatedTasks>({} as PaginatedTasks);

    const navigation = useNavigation<NavigationScreens>();
    const { api, logout } = useApi();

    async function fetchTasks() {
        try {
            const { data } = await api.get("/task");

            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const { results } = tasks;

    function handleLogout() {
        logout();
        navigation.navigate("Login");
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Logout" onPress={handleLogout} />
            <Text>
                {results?.map((task, index) => (
                    <Text key={`task-${index}`}>{task.title}</Text>
                ))}
            </Text>
        </View>
    )
}