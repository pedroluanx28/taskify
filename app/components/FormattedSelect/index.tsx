import { Text, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { styles } from "./styles";

type FormattedSelectProps = {
    onValueChange: (value: string) => void;
    value?: {
        label: string;
        value: string;
    },
    options: {
        label: string;
        value: string;
    }[],
    placeholder?: string;
    label?: string;
    errorMessage?: string;
}

export function FormattedSelect({
    onValueChange,
    options,
    placeholder,
    label,
    errorMessage,
}: FormattedSelectProps) {
    function getErrorStyles() {
        if (errorMessage) {
            return {
                borderColor: "#C62828",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 5,
            }
        }
    }

    const optionsLength = options.length;

    const errorStyles = getErrorStyles();

    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}
            
            <Dropdown
                placeholder={placeholder}
                data={optionsLength ? options : [{
                    label: "Nenhum dado encotrado.",
                    value: "",
                }]}
                labelField="label"
                valueField="value"
                onChange={(event) => onValueChange(event.value)}
                style={[styles.input, (errorStyles as ViewStyle)]}
                placeholderStyle={styles.inputPlaceholder}
            />

            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </>
    )
}