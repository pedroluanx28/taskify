import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 26,
        paddingVertical: 35,
    },
    darkBlueText: {
        color: theme.colors.darkBlue,
        fontFamily: theme.fonts.inter700,
    },
    title: {
        fontFamily: theme.fonts.inter700,
        fontSize: 24,
        textAlign: "center",
    },
    subTitle: {
        fontFamily: theme.fonts.inter500,
        textAlign: "center",
        color: theme.colors.grey,
    },
    registerButton: {
        ...theme.buttons.darkBlueButton,
        width: "100%",
    },
    registerButtonText: {
        textAlign: "center",
        color: "#fff",
        fontFamily: theme.fonts.poppins600,
        fontSize: 20,
    },
    buttonContainer: {
        width: "100%",
        gap: 10,
    },
    link: {
        textAlign: "center",
        fontFamily: theme.fonts.inter500,
    },
    strongLink: {
        color: theme.colors.purple,
        fontFamily: theme.fonts.inter700,
        textDecorationStyle: "solid",
        textDecorationColor: theme.colors.purple,
        textDecorationLine: "underline",
    }
});