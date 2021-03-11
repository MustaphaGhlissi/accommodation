import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { FAB, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../assets/styles';
import DownloadItem from '../components/DownloadItem';
import { downloadExaminations, onCheckDownload, saveDownloads } from '../redux/actions/actionCreators';
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
            isLoading
        } = this.props;

        if(isLoading && !data) {
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
                />

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
    isRefreshing: main.isRefreshing,
    data: main.downloads ?.examinations
})

const mapDispatchToProps = dispatch => ({
    onCheck: (item) => dispatch(onCheckDownload(item)),
    saveToStorage: (navigation, data) => dispatch(saveDownloads(navigation, data)),
    download: (bool = false) => dispatch(downloadExaminations(bool))
})

Download = withTheme(Download)

export default connect(mapStateToProps, mapDispatchToProps)(Download)
