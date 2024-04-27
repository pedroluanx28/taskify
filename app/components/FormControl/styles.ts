import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles";

export const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        paddingLeft: 10,
        paddingRight: 40,
    },
    errorMessage: {
        color: "#C62828",
        width: "100%",
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
    }
});