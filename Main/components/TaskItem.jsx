import React from 'react';
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../assets/styles';
import { useNavigation } from '@react-navigation/native';
import _ from "lodash";
import { useDispatch } from 'react-redux';
import { fillForm } from '../redux/actions/actionCreators';
import { TASK_FORM } from '../constants/forms';

const TaskItem = ({item}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        Platform.OS === 'android' ? 
        <TouchableNativeFeedback
            onPress={() => {
                dispatch(fillForm(TASK_FORM, {
                    result: item.result,
                    remark: item.remark
                }))
                navigation.navigate('Task', {task: item})
            }}
            useForeground
        >
            <View style={styles.accoItem}>
                <Text>
                {_.upperFirst(item.description)}
                </Text>
            </View>
        </TouchableNativeFeedback>:
        <TouchableOpacity
        onPress={() => {
                dispatch(fillForm(TASK_FORM, {
                    result: item.result,
                    remark: item.remark
                }))
                navigation.navigate('Task', {task: item})
            }}
            activeOpacity={0.6}
            style={styles.accoItem}
        >
            <Text>
                {_.upperFirst(item.description)}
            </Text>
        </TouchableOpacity>
    )
}

export default TaskItem
