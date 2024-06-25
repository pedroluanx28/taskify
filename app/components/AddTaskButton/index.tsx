import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationScreens } from "../../routes/app.routes";

type Props = {
    fetchTasks: () => void;
};

export function AddTaskButton({ fetchTasks }: Props) {
    const navigation = useNavigation<NavigationScreens>();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Form", { fetchTasks })}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
    )
}