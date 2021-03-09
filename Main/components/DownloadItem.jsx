import React from 'react';
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Text, Checkbox, useTheme } from 'react-native-paper';
import { styles } from '../assets/styles';
import { useNavigation } from '@react-navigation/native';

const DownloadItem = ({item, onCheck, checked}) => {

    const navigation = useNavigation();
    const theme = useTheme();

    return (
        Platform.OS === 'android' ? 
        <TouchableNativeFeedback
            onPress={onCheck}
            useForeground
        >
            <View style={styles.downloadItem}>
                <Text style={styles.downloadText}>
                    {item.name}
                </Text>

                <Checkbox
                    color={theme.colors.primary}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={onCheck}
                />
            </View>
        </TouchableNativeFeedback>:
        <TouchableOpacity
            onPress={onCheck}
            activeOpacity={0.6}
            style={styles.accoItem}
        >
            <Text>
                {item.name}
            </Text>
        </TouchableOpacity>
    )
}

export default DownloadItem
