import React from 'react';
import { Appbar } from 'react-native-paper';

const AppHeader = ({scene, previous, navigation}) => {

    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
            
            {
                !previous &&
                <>
                    <Appbar.Action icon='arrow-up' color='#fff' onPress={() => {}}/>
                    <Appbar.Action icon='arrow-down' color='#fff' onPress={() => navigation.navigate('Download')}/>
                    <Appbar.Action icon='cog' color='#fff' onPress={() => navigation.navigate('Settings')}/>
                </>
            }
        </Appbar.Header>
    )
}

export default AppHeader
