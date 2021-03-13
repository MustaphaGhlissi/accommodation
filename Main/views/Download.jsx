import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import { Button, Dialog, FAB, Portal, Text, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../assets/styles';
import DownloadItem from '../components/DownloadItem';
import { downloadExaminations, onCheckDownload, saveDownloads, toggleDialog } from '../redux/actions/actionCreators';
import Loader from './Loader';

class Download extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            download
        } = this.props;

        download();
    }

    render() {

        let {
            navigation, theme, onCheck, 
            checkedDownloads, saveToStorage,
            data, download,
            isRefreshing,
            isDownloading,
            isLoading
        } = this.props;

        if(isLoading) {
            return <Loader />
        }

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={data}
                    renderItem={({item, index}) => <DownloadItem 
                            item={item} 
                            key={index} 
                            onCheck={() => onCheck(item)} 
                            checked={checkedDownloads.find(checkedDownload => checkedDownload.id === item.id) !== undefined}
                        />
                    }
                    keyExtractor={item => item.id.toString()}
                    refreshControl={<RefreshControl 
                            refreshing={isRefreshing} 
                            onRefresh={() => download(true)} 
                            colors={[theme.colors.primary, theme.colors.accent]} 
                        />
                    }

                    ListEmptyComponent={
                        <View style={[styles.content, styles.centered]}>
                            <Text style={styles.muted}>No data</Text>
                            <Button
                                onPress={download}
                                icon='refresh'
                            >
                                REFRESH
                            </Button>
                        </View>
                    }
                />

                <Portal>
                    <Dialog visible={isDownloading} onDismiss={toggleDialog}>
                        <Dialog.Content>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ActivityIndicator color={theme.colors.primary}/>
                                <Text style={styles.labelDownload}>Downloading...</Text>
                            </View>
                        </Dialog.Content>
                    </Dialog>
                </Portal>

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => saveToStorage(navigation, checkedDownloads)}
                    disabled={checkedDownloads.length === 0}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    checkedDownloads: main.checkedDownloads,
    isLoading: main.isLoading,
    isDownloading: main.isDownloading,
    isRefreshing: main.isRefreshing,
    data: main.downloads ?.examinations
})

const mapDispatchToProps = dispatch => ({
    onCheck: (item) => dispatch(onCheckDownload(item)),
    saveToStorage: (navigation, data) => dispatch(saveDownloads(navigation, data)),
    download: (bool = false) => dispatch(downloadExaminations(bool)),
    toggleDialog: () => dispatch(toggleDialog())
})

Download = withTheme(Download)

export default connect(mapStateToProps, mapDispatchToProps)(Download)
