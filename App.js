import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import MurphyScreen from './screens/Murphy';
import Expo from 'expo';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';
    
import { Button, CheckBox } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

const Router = createRouter(() => ({
  murphy: () => MurphyScreen,
}));

export default class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('murphy')} />
      </NavigationProvider>
    );
  }
}

// Disables yellowbox warnings
console.disableYellowBox = true;