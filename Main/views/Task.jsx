import React, { Component } from 'react'
import { View,  } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FAB, Text, RadioButton, TextInput } from 'react-native-paper';
import { styles } from '../assets/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fillForm, handleRadio, handleTextInput, updateTask } from '../redux/actions/actionCreators';
import { TASK_FORM } from '../constants/forms';

class Task extends Component {
    
    

    componentWillUnmount() {

        let {resetForm} = this.props;
        resetForm();
    }
    

    render() {
        
        const {
            form, 
            navigation,
            handleRadio,
            handleInput,
            route,
            update
        } = this.props, {task} = route.params;
        
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='always'
            >
                
                <View style={styles.content}>
                    <View style={{
                        marginBottom: 20
                    }}>
                        <Text>
                            Result:
                        </Text>
                        <RadioButton.Group 
                            onValueChange={newValue => handleRadio('result', newValue === 'true')} 
                            value={form.result?.toString() || task.result.toString()}
                        >
                            <View style={styles.radio}>
                                <RadioButton value={'true'} />
                                <Text style={{flex: 1}} onPress={() => handleRadio('result', true)}>Passed</Text>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton value= {'false'} />
                                <Text style={{flex: 1}} onPress={() => handleRadio('result', false)}>Not passed</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <TextInput
                        multiline
                        numberOfLines={6}
                        label='Remark'
                        mode='outlined'
                        onChangeText={text => handleInput('remark', text)}
                        value={form.remark || ''}
                    />
                </View>

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => update(navigation, task)}
                />
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    form: main[TASK_FORM]
})

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(fillForm(TASK_FORM, {result: null, remark: null})),
    handleInput: (input, value) => dispatch(handleTextInput(TASK_FORM, input, value)),
    handleRadio: (radio, value) => dispatch(handleRadio(TASK_FORM, radio, value)),
    update: (navigation, task) => dispatch(updateTask(navigation, task))
})


export default connect(mapStateToProps, mapDispatchToProps)(Task)
