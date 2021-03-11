import React from 'react';
import { Appbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { toggleDialog } from '../redux/actions/actionCreators';

const AppHeader = ({scene, previous, navigation}) => {

    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    const dispatch = useDispatch();

    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
            
            {
                !previous &&
                <>
                    <Appbar.Action icon='arrow-up' color='#fff' onPress={() => {}}/>
                    <Appbar.Action icon='arrow-down' color='#fff' onPress={() => navigation.navigate('Download')}/>
                    <Appbar.Action icon='cog' color='#fff' onPress={() => dispatch(toggleDialog())}/>
                </>
            }
        </Appbar.Header>
    )
}

export default AppHeader
