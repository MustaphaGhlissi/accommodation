import React from 'react';
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../assets/styles';
import { useNavigation } from '@react-navigation/native';

const TaskItem = ({item}) => {

    const navigation = useNavigation();

    return (
        Platform.OS === 'android' ? 
        <TouchableNativeFeedback
            onPress={() => navigation.navigate('Task')}
            useForeground
        >
            <View style={styles.accoItem}>
                <Text>
                    {item.name}
                </Text>
            </View>
        </TouchableNativeFeedback>:
        <TouchableOpacity
        onPress={() => navigation.navigate('Task')}
            activeOpacity={0.6}
            style={styles.accoItem}
        >
            <Text>
                {item.name}
            </Text>
        </TouchableOpacity>
    )
}

export default TaskItem
