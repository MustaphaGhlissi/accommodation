import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from '../assets/styles'


const innerStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const Loader = () => {

    const theme = useTheme();

    return (
        <View style={[styles.container, innerStyles.container]}>
            <ActivityIndicator 
                size={32}
                color={theme.colors.primary}
            />
        </View>
    )
}

export default Loader
