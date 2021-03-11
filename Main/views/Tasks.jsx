import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { FAB, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../assets/styles';
import TaskItem from '../components/TaskItem';
import { fetchTasks } from '../redux/actions/actionCreators';

class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
           
        }
    }


    componentDidMount() {
        const {
            readFromStorage,
            route
        } = this.props, {examinationId} = route.params;

        readFromStorage(examinationId);
    }
    

    render() {

        
        const {
            theme, navigation, data
        } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={data}
                    renderItem={({item, index}) => <TaskItem item={item} key={index}/>}
                    keyExtractor={item => item.id.toString()} 
                />

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => navigation.navigate('Finish')}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    isLoading: main.isLoading,
    isRefreshing: main.isRefreshing,
    data: main.tasks,
})

const mapDispatchToProps = dispatch => ({
    readFromStorage: (examinationId, bool = false) => dispatch(fetchTasks(examinationId, bool))
})

Tasks = withTheme(Tasks)

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)