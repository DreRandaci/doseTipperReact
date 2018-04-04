import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    FlatList,
    Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Enter Total Tips',
      allShifts: [
        {shift: '6am - 1pm'},
        {shift: '7am - 1pm'},
        {shift: '1pm - 7pm'},
      ],
      selectedShift: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.heading}>Dose Tipper</Text>        
        
        <Picker
          selectedValue={this.state.selectedShift}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedShift: itemValue})}
          >          
          {
            this.state.allShifts.map((val, i) => 
              <Picker.Item key={i} label={val.shift} value={val.shift}/>)
          }          
        </Picker>

        <TextInput 
          maxLength = {40}
          value={this.state.text}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
  },
  heading: {
    marginTop: 50,
    fontSize: 40
  },
});
