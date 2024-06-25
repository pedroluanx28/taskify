import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 25,
        borderRadius: 6,
    },
    badgeText: {
        fontFamily: theme.fonts.inter500,
    },
    label: {
        marginBottom: -9,
        color: "#0E0B16",
        fontFamily: theme.fonts.inter500,
    },
});