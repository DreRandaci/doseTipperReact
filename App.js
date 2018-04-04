import React from 'react';
import { 
    Button,
    StyleSheet, 
    Text, 
    View,
    TextInput,
    FlatList,
    Picker,
    Modal,
    TouchableOpacity, } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredTips: 0,
      calculatedTips: '',
      allShifts: [
        {shift: '6am - 1pm'},
        {shift: '7am - 1pm'},
        {shift: '1pm - 7pm'},
      ],
      selectedShift: [],
      baristaTips: '',
      cashierTips: '',
      barbackTips: '',
      k1Tips: '',
      k2Tips: '',
      k3Tips: '',
    };
  }
  
  selectShift(shift) { 
    this.setState({
      selectedShift: shift
    }); 
  }
  
  calculateTips() {

  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.heading}>Dose Tipper</Text>        
        
        <Text style={styles.shifts}>Select Shift</Text>
        
        <View style={{height: 100}}>

        <FlatList
          style={styles.listContainer}
          data={this.state.allShifts}
          keyExtractor={item => item.shift}
          renderItem={({item, index}) => 
            <TouchableOpacity
            onPress={this.selectShift.bind(this, item)}
            >
              <Text>{item.shift}
              </Text>
            </TouchableOpacity>}
        />        
        </View>

        <View>
          <TextInput
          placeholder={'Enter Total Tips'}
          clearTextOnFocus={true}          
          style={styles.enterTips} 
          maxLength={40}
          onChangeText={(tips) => this.setState({enteredTips: tips})}
          value={this.state.enteredTips}/>
        </View>

        <Text>{this.state.selectedShift.shift}</Text>
        
        <Text>{this.state.enteredTips}</Text>
        
        <Button
          onPress={this.calculateTips}
          title="Get Tips"
          color="blue"
          accessibilityLabel="Learn more about this purple button"
        />

        <View style={{display: this.state.calculatedTips === '' ? 'none' : ''}}>
          <Text>Barista: </Text>
          <Text>Cashier: </Text>
          <Text>Barback: </Text>
          <Text>K1: </Text>
          <Text>K2: </Text>
          <Text>K3: </Text>
        </View>
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
    fontSize: 40,    
  },
  listContainer: {
    
  },
  shifts: {
    marginTop: 20,
    fontSize: 20,
  },
  enterTips: {
    
  }
});

// Disables yellowbox warnings
console.disableYellowBox = true;