import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Dose Tipper</Text>
        <TextInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',    
  },
  heading: {
    marginTop: 50,
    fontSize: 40
  },
});