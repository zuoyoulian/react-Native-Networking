/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  AlertIOS,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import App from './App'

class NetworkingIOS extends Component {

  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('NetworkingIOS', () => NetworkingIOS);
