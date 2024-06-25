import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 7,
        backgroundColor: "#E7DFDD",
        marginBottom: 10,
        flexDirection: "row",
        overflow: "hidden",
    },
    label: {
        height: "100%",
        width: 10,
    },
    content: {
        padding: 16,
        flex: 1,
    },
    infos: {
        flexDirection: "row",
    },
    checkboxContainer: {
        padding: 16,
        justifyContent: "center",
        alignItems: "center",  
    },
});