import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    title: {
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: theme.fonts.inter700,
        fontSize: 23,
        color: theme.colors.darkPurple,
    },
    form: {
        flex: 1,
        justifyContent: "space-between",
    },
    inputsContainer: {
        gap: 18,
    },
    submitButton: {
        ...theme.buttons.darkBlueButton,
        width: "100%",
    },
    submitButtonText: {
        textAlign: "center",
        color: "#fff",
        fontFamily: theme.fonts.poppins600,
        fontSize: 20,
    }
});