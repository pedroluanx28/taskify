import { theme } from "../../../global/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
    label: {
        marginBottom: -10,
        color: "#0E0B16",
        fontFamily: theme.fonts.inter500,
    },
    input: {
        paddingHorizontal: 10,
        height: 50,
        borderColor: "#E0E0E0",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 6,
    },
    inputPlaceholder: {
        color: "#A0A0A0",
    },
    errorMessage: {
        color: "#C62828",
        width: "100%",
        fontFamily: theme.fonts.inter500,
        marginTop: -12,
    }
});