import React, { Component } from 'react'
import { View,  } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FAB, Text, RadioButton, TextInput } from 'react-native-paper';
import { styles } from '../assets/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { handleRadio, handleTextInput } from '../redux/actions/actionCreators';
import { TASK_FORM } from '../constants/forms';

class Task extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        
        const {
            form, 
            navigation,
            handleRadio
        } = this.props;
        
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
                            onValueChange={newValue => handleRadio('result', newValue)} 
                            value={form.result || 'passed'}
                        >
                            <View style={styles.radio}>
                                <RadioButton value="passed" />
                                <Text style={{flex: 1}} onPress={() => handleRadio('result', 'passed')}>Passed</Text>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton value="not passed" />
                                <Text style={{flex: 1}} onPress={() => handleRadio('result', 'not passed')}>Not passed</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                   
                    <TextInput
                        multiline
                        numberOfLines={6}
                        label='Remark'
                        mode='outlined'
                    />
                </View>

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => navigation.goBack()}
                />
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    form: main[TASK_FORM]
})

const mapDispatchToProps = dispatch => ({
    handleInput: (input, value) => dispatch(handleTextInput(TASK_FORM, input, value)),
    handleRadio: (radio, value) => dispatch(handleRadio(TASK_FORM, radio, value)) 
})


export default connect(mapStateToProps, mapDispatchToProps)(Task)
