import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FAB, TextInput } from 'react-native-paper'
import { styles } from '../assets/styles'

class Settings extends Component {
    render() {

        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                
                <View style={styles.content}>
                    <TextInput 
                        label='API ip-address'
                        mode='outlined'
                        placeholder='127.0.0.1'
                    />
                </View>

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => navigation.popToTop()}
                />
            </View>
        )
    }
}

export default Settings
