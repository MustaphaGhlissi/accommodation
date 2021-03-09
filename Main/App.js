/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './config/stack';
import { StatusBar } from 'react-native';
import { withTheme } from 'react-native-paper';

export class App extends Component {
  render() {

    const {theme} = this.props;

    return (
      <NavigationContainer>
        <StatusBar backgroundColor={theme.colors.primary}/>
        <HomeStack />
      </NavigationContainer>
    )
  }
}

App = withTheme(App);

export default App
