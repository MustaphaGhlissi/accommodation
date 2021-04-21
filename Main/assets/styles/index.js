import { Dimensions, StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    appTitle: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        color: '#fff',
        marginBottom: 20
    },  
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1'
    },
    content: {
        flex: 1,
        padding: 20
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    muted: {
        color: '#C1C1C1',
        fontFamily: 'Roboto-Bold',
        fontSize: 23,
        marginBottom: 15
    },
    scrollable: {
        flexGrow: 1,
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
    },
    labelDownload: {
        marginLeft: 15
    },
    photosPickerContainer: {
        marginTop: 30,
        marginBottom: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    photoContainer: {
        width: '50%',
        padding: 5,
        position: 'relative'
    },
    photoPicker: {
        height: 120,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderColor: '#D1D1D1',
        borderWidth: 3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photo: {
        borderRadius: 10,
        width: '100%',
        height: 120,
    },
    removePhoto: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 9999,
        padding: 5, 
        borderRadius: 32
    }
})