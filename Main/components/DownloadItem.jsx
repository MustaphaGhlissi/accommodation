import React, {useState} from 'react';
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Text, Checkbox, useTheme } from 'react-native-paper';
import { styles } from '../assets/styles';
import { useStore } from 'react-redux';

const DownloadItem = ({item, onCheck, checked}) => {

    const theme = useTheme();

    return (
        Platform.OS === 'android' ? 
        <TouchableNativeFeedback
            onPress={onCheck}
            useForeground
        >
            <View style={styles.downloadItem}>
                <Text style={styles.downloadText}>
                    {item.datePlanned + ' ' + item.id}
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
            style={styles.downloadItem}
        >
            <Text style={styles.downloadText}>
                {item.datePlanned + ' ' + item.id}
            </Text>

            <Checkbox
                color={theme.colors.primary}
                status={checked ? 'checked' : 'unchecked'}
                onPress={onCheck}
            />
        </TouchableOpacity>
    )
}

export default DownloadItem
