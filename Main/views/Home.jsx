import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { Button, Dialog, Portal, TextInput, withTheme } from 'react-native-paper';
import { styles } from '../assets/styles';
import ExaminationItem from '../components/ExaminationItem';
import Loader from './Loader';
import {
    fetchExaminations, toggleDialog
} from '../redux/actions/actionCreators';
import { connect } from 'react-redux';
import { removeStorage } from '../storage';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: null
        }
    }

    componentDidMount() {
        const {
            readFromStorage,
            navigation,
        } = this.props;

        //removeStorage();

        this._unsubscribe = navigation.addListener('focus', () => {
            readFromStorage();
        });
    }
    
    componentWillUnmount() {
        this._unsubscribe();
    }
    
    checkPass = () => {
        const {password} = this.state;
        const {navigation, toggleDialog} = this.props;

        if(password && password === 'apollo') { 
            this.setState({
                password: null
            })
            toggleDialog();
            navigation.navigate('Settings');
        }
        else {
            Alert.alert('Error', 'Password incorrect.');
        }
    }

    render() {
        const {
            theme, data,
            isRefreshing,
            isLoading,
            readFromStorage,
            isOpenDialog, 
            toggleDialog,
            isUploading,
        } = this.props;

        const {
            password
        } = this.state;

        

        if(isLoading) {
           return <Loader />
        }

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={data || []}
                    renderItem={({item, index}) => <ExaminationItem item={item} key={index}/>}
                    keyExtractor={item => item.id?.toString()}
                    refreshControl={<RefreshControl 
                            refreshing={isRefreshing} 
                            onRefresh={() => readFromStorage(true)} 
                            colors={[theme.colors.primary, theme.colors.accent]} 
                        />
                    }
                    ListEmptyComponent={
                        <View style={[styles.content, styles.centered]}>
                            <Text style={styles.muted}>No data found</Text>
                            <Button
                                onPress={readFromStorage}
                                icon='refresh'
                            >
                                REFRESH
                            </Button>
                        </View>
                    }
                />


                <Portal>
                    <Dialog visible={isOpenDialog} onDismiss={toggleDialog}>
                    <Dialog.Title>Enter password</Dialog.Title>
                    <Dialog.Content>
                        <TextInput 
                            mode='outlined'
                            label='Password'
                            onChangeText={text => this.setState({password: text})}
                            value={password || ''}
                            secureTextEntry
                            autoCapitalize={'none'}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={this.checkPass}>Confirm</Button>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>


                <Portal>
                    <Dialog visible={isUploading} onDismiss={toggleDialog}>
                        <Dialog.Content>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ActivityIndicator color={theme.colors.primary}/>
                                <Text style={styles.labelDownload}>Uploading...</Text>
                            </View>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    isLoading: main.isLoading,
    isUploading: main.isUploading,
    isRefreshing: main.isRefreshing,
    data: main.examinations,
    isOpenDialog: main.isOpenDialog
})

const mapDispatchToProps = dispatch => ({
    readFromStorage: (bool = false) => dispatch(fetchExaminations(bool)),
    toggleDialog: () => dispatch(toggleDialog())
})

Home = withTheme(Home)

export default connect(mapStateToProps, mapDispatchToProps)(Home)