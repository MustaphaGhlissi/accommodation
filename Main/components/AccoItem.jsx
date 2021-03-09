import React from 'react';
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../assets/styles';

const AccoItem = ({item}) => {
    return (
        Platform.OS === 'android' ? 
        <TouchableNativeFeedback
            onPress={() => {}}
            useForeground
        >
            <View style={styles.accoItem}>
                <Text>
                    {item.name}
                </Text>
            </View>
        </TouchableNativeFeedback>:
        <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.6}
            style={styles.accoItem}
        >
            <Text>
                {item.name}
            </Text>
        </TouchableOpacity>
    )
}

export default AccoItem
