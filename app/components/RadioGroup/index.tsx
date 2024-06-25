import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";

type RadioGroupProps = {
    label?: string;
    onChange: (value: string) => void;
    value: string;
    data: {
        value: string;
        label: string;
    }[],
}

export function RadioGroup({
    label,
    onChange,
    data,
    value,
}: RadioGroupProps) {
    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.container}>
                {data.map((item, index) => {
                    const isSelectedItem = item.value === value;

                    const badgeBackground = isSelectedItem ? {
                        backgroundColor: "#A239CA",
                    } : {
                        backgroundColor: "#E0E0E0",
                    };

                    const badgeTextColor = isSelectedItem ? {
                        color: "#FFF",
                    } : {
                        color: "#797979",
                    };

                    return (
                        <Pressable
                            key={`radio-${index}`}
                            onPress={() => onChange(item.value)}
                            style={[styles.badge, badgeBackground]}
                        >
                            <Text style={[styles.badgeText, badgeTextColor]}>{item.label}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </>
    )
}