import { useState } from "react";
import { Text, View } from "react-native";

import dayjs from "dayjs";
import { priorityColors } from "../../enums/priority";

import { TaskCheckbox } from "../TaskCheckbox";

import { styles } from "./styles";

type Props = {
    task: Task;
};

export function Task({ task }: Props) {
    const [isChecked, setIsChecked] = useState(Boolean(task.is_checked));

    const priorityColor = {
        backgroundColor: priorityColors[task?.priority?.id as keyof typeof priorityColors],
    };

    const titleStyle = isChecked && { textDecorationLine: "line-through" } as const;
    const formattedLimitDate = task?.limit_date ? dayjs(task?.limit_date).format("HH:mm") : "";

    return (
        <View style={styles.container}>
            <View style={[styles.label, priorityColor]} />

            <View style={styles.content}>
                <Text style={titleStyle}>{task.title}</Text>

                <View style={styles.infos}>
                    <Text>{task?.task_group?.name}</Text>

                    <Text>{task.task_group?.name && formattedLimitDate && " - "}</Text>

                    <Text>
                        {formattedLimitDate}
                    </Text>
                </View>
            </View>

            <View style={styles.checkboxContainer}>
                <TaskCheckbox
                    task={task}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            </View>
        </View>
    )
}