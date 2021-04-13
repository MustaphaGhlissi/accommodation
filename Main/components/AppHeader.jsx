import React from 'react';
import { Appbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { toggleDialog, upload } from '../redux/actions/actionCreators';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

const AppHeader = ({scene, previous, navigation}) => {

    const routeName = scene.route.name;
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : routeName;

    const dispatch = useDispatch();
    let subTitle = '';
    
    if(routeName === 'Finish') {
        subTitle = 'AbschlieBen';
    }
    else if (routeName === 'Tasks') {
        subTitle = 'Aufgaben'
    }

    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content
                title={title}
                subtitle={subTitle}
            />
            
            {
                !previous &&
                <>
                    <Appbar.Action icon='arrow-down' color='#fff' onPress={() => {
                        NetInfo.fetch().then(state => {
                            if(!state.isConnected) {
                                Alert.alert('Error', 'No internet connection\nCheck you connectivity and try again.')
                                return false;
                            }
                            navigation.navigate('Download')
                        });
                    }}/>
                    <Appbar.Action icon='arrow-up' color='#fff' onPress={() => {
                         NetInfo.fetch().then(state => {
                            if(!state.isConnected) {
                                Alert.alert('Error', 'No internet connection\nCheck you connectivity and try again.')
                                return false;
                            }
                            dispatch(upload());
                        });
                    }}/>
                    <Appbar.Action icon='cog' color='#fff' onPress={() => dispatch(toggleDialog())}/>
                </>
            }
        </Appbar.Header>
    )
}

export default AppHeader
