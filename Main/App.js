/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    )
  }
}

export default App
