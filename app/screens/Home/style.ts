import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 15,
    },
    logo: {
        fontSize: 28,
        fontFamily: theme.fonts.kanit500,
        color: theme.colors.darkBlue,
    },
    noTasksContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    noTasksTitle: {
        fontFamily: theme.fonts.inter700,
        color: "#0E0B16",
        fontSize: 20,
        marginTop: 13,
    },
    noTasksSubtitle: {
        color: theme.colors.grey,
        fontFamily: theme.fonts.inter500,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    headerButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 17,
    }
});