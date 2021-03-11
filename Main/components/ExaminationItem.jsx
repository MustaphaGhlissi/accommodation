import React from 'react';
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../assets/styles';
import { useNavigation } from '@react-navigation/native';

const ExaminationItem = ({item}) => {

    const navigation = useNavigation();

    return (
        Platform.OS === 'android' ? 
        <TouchableNativeFeedback
            onPress={() => navigation.navigate('Tasks')}
            useForeground
        >
            <View style={styles.accoItem}>
                <Text>
                    {item.datePlanned + ' ' + item.id}
                </Text>
            </View>
        </TouchableNativeFeedback>:
        <TouchableOpacity
        onPress={() => navigation.navigate('Tasks')}
            activeOpacity={0.6}
            style={styles.accoItem}
        >
            <Text>
                {item.datePlanned + ' ' + item.id}
            </Text>
        </TouchableOpacity>
    )
}

export default ExaminationItem
