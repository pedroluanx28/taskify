import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles";

export const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 7,
    },
    errorMessage: {
        color: "#C62828",
        width: "100%",
        fontFamily: theme.fonts.inter500,
    },
    label: {
        marginBottom: 5,
        color: "#0E0B16",
        fontFamily: theme.fonts.inter500,
    },
    icon: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    calendarIcon: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        paddingHorizontal: 14,
        justifyContent: "center",
    },
});