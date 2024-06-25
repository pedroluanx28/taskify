import { useState } from "react";
import { View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackProps } from "../../routes/app.routes";

import { RadioGroup } from "../../components/RadioGroup";
import { TaskForm } from "../../components/TaskForm";
import { CategoryForm } from "../../components/CategoryForm";

import { styles } from "./styles";

type FormScreenNavigationProp = NativeStackScreenProps<RootStackProps, 'Form'>;

export function Form({ route }: FormScreenNavigationProp) {
    const [formType, setFormType] = useState("1");

    const formTypeOptions = [
        { label: "Tarefa", value: "1" }, // 1 is the value of the task form
        { label: "Categoria", value: "2" }, // 2 is the value of the category form
    ];

    const handleChange = (value: string) => setFormType(value);

    return (
        <View style={styles.container}>
            <RadioGroup
                data={formTypeOptions}
                value={String(formType)}
                onChange={handleChange}
            />

            <View style={styles.content}>
                {formType === "1" ? <TaskForm fetchTasks={route.params.fetchTasks} /> : <CategoryForm />}
            </View>
        </View>
    )
}