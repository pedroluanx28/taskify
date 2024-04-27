import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 40,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
    },
    content: {
        gap: 20,
    },
    onboardingTitle: {
        fontFamily: theme.fonts.inter700,
        fontSize: 23,
        textAlign: "center",
    },
    darkBlueText: {
        color: theme.colors.darkBlue,
    },
    onboardingText: {
        fontFamily: theme.fonts.inter500,
        textAlign: "center",
        fontSize: 16,
        color: theme.colors.grey,
    },
    startNowButton: theme.buttons.darkBlueButton,
    startNowButtonText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: theme.fonts.poppins600,
        fontSize: 20,
    },
});