import React from 'react';
import { Button, View, } from 'react-native';
import Murphy from './screens/Murphy';
import Drawer from './routes/drawer';

export default class App extends React.Component {

  render() {

    return (
      <View style={{flex: 1}}>
        <Drawer />
      </View>
    );
  }
}

// Disables yellowbox warnings
console.disableYellowBox = true;