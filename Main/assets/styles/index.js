import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1'
    },
    content: {
        flex: 1,
        padding: 20
    },
    flatList: {
        flexGrow: 1
    },
    accoItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    downloadItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        flexDirection: 'row',
        alignItems: 'center'
    },
    downloadText: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})