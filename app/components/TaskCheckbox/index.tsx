import { useState } from "react";
import { Pressable, TouchableOpacity, View, } from "react-native";

import { useApi } from "../../utils/hooks/useApi";
import { useAsyncStorage } from "../../utils/hooks/useAsyncStorage";
import { SvgImage } from "../SvgImage";

import { styles } from "./styles";
import CheckSvg from "../../assets/check.svg";

type Props = {
    task: Task;
    setIsChecked: (isChecked: boolean) => void;
    isChecked: boolean;
}

export function TaskCheckbox({
    task,
    setIsChecked,
    isChecked,
}: Props) {
    const [isLoading, setIsLoading] = useState(true);

    const { api } = useApi();
    const { setItem } = useAsyncStorage();

    async function handleChangeCheckbox() {
        setIsLoading(true);

        try {
            const { data } = await api.put(`/task/changeStatus/${task.id}`,);

            setItem("tasks", JSON.stringify(data));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsChecked(!isChecked);
        }
    }

    return (
        <View onTouchStart={handleChangeCheckbox}>
            <TouchableOpacity
                style={[styles.checkbox, isChecked && styles.checked]}
                disabled={isLoading}
            >
                {Boolean(isChecked) && (
                    <SvgImage icon={CheckSvg} />
                )}
            </TouchableOpacity>
        </View>
    )
}