import React from 'react';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
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
                    title: 'Flat examinations'
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
                    title: 'Settings'
                }}    
            />
            <Stack.Screen 
                name="Tasks" 
                component={Tasks} 
                options={{
                    title: 'Flat examination Tasks'
                }}    
            />
            <Stack.Screen 
                name="Task" 
                component={Task} 
                options={{
                    title: 'Task details'
                }}    
            />
            <Stack.Screen 
                name="Finish" 
                component={Finish} 
                options={{
                    title: 'Finish'
                }}    
            />
        </Stack.Navigator>
    );
}


export {
    HomeStack
}