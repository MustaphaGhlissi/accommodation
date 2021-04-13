import React from 'react';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import _ from 'lodash';
import Home from '../../views/Home';
import AppHeader from '../../components/AppHeader';
import Settings from '../../views/Settings';
import Download from '../../views/Download';
import Tasks from '../../views/Tasks';
import Task from '../../views/Task';
import Finish from '../../views/Finish';


const Stack = createStackNavigator();

const HomeStack = () => {
  
    return (
        <Stack.Navigator
            screenOptions={{
                header: (props) => <AppHeader {...props}/>,
                ...TransitionPresets.SlideFromRightIOS
            }}
            mode='modal'
        >
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                    title: 'Wohnungen'
                }}    
            />
            <Stack.Screen 
                name="Download" 
                component={Download} 
                options={{
                    title: 'Download'
                }}    
            />
            <Stack.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    title: 'Einstellungen'
                }}    
            />
            <Stack.Screen 
                name="Tasks" 
                component={Tasks}   
                options={({ route }) => ({ 
                    title: _.capitalize(route.params.title) 
                })}
            />
            <Stack.Screen 
                name="Task" 
                component={Task} 
                options={({ route }) => ({ 
                    title: _.capitalize(route.params.task.description) 
                })}
            />
            <Stack.Screen 
                name="Finish" 
                component={Finish} 
                options={({ route }) => ({ 
                    title: _.capitalize(route.params.title),
                })}  
            />
        </Stack.Navigator>
    );
}


export {
    HomeStack
}