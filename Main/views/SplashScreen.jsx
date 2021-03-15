import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Text } from 'react-native-paper'
import { styles } from '../assets/styles'

const SplashScreen = (props) => {
    return (
        <View style={[styles.container, styles.centered, {backgroundColor: props.color} ]}>
            <StatusBar backgroundColor={props.color}/>
            <Text style={styles.appTitle}>
                Accommodation
            </Text>
            <ActivityIndicator color='#fff' size={24}/>
        </View>
    )
}

export default SplashScreen
