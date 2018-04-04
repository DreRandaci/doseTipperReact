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
      hours: 0,
      allShifts: [
        {shift: '6am - 1pm', hours: 7},
        {shift: '7am - 1pm', hours: 6},
        {shift: '1pm - 7pm', hours: 6},
      ],
      selectedShift: {},
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
    if(this.state.enteredTips > 0 && this.state.selectedShift.hours > 0) {
      
      let enteredTips = Math.round(this.state.enteredTips);
      let kitchenTips = Math.round(this.state.enteredTips*0.2);
      let barTips = (enteredTips-(kitchenTips))/2;
      let cashTips = (enteredTips-(kitchenTips))/2;
      let kitchenTipsPerHr = kitchenTips/this.state.selectedShift.hours;
      let k1Tips = this.state.selectedShift.hours === 7 ? kitchenTipsPerHr*3/2 : kitchenTipsPerHr*2/2;
      let k2Tips = this.state.selectedShift.hours === 7 ? kitchenTipsPerHr*3/2 : kitchenTipsPerHr*2/2;
      let k1k2k3AverageTipsAfterFirstPayout = kitchenTipsPerHr*4/3;
      let k3Tips = k1k2k3AverageTipsAfterFirstPayout;
      k1Tips+=k1k2k3AverageTipsAfterFirstPayout; 
      k2Tips+=k1k2k3AverageTipsAfterFirstPayout; 

      this.setState({
        baristaTips: barTips, 
        cashierTips: cashTips, 
        // barbackTips: bbTips, 
        k1Tips: k1Tips,
        k2Tips: k2Tips,
        k3Tips: k3Tips,
      });
    }
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

        
        <Text style={{color: 'red'}}>Shift: {this.state.selectedShift.shift}</Text>
        <Text style={{color: 'red'}}>Shift Hours: {this.state.selectedShift.hours}</Text>
        
        
        <Button
          onPress={this.calculateTips.bind(this)}
          title="Get Tips"
          color="blue"
        />

        <View>
          <Text>Barista: {this.state.baristaTips}</Text>
          <Text>Cashier: {this.state.cashierTips}</Text>
          <Text>Barback: {this.state.barbackTips}</Text>
          <Text>K1: {this.state.k1Tips}</Text>
          <Text>K2: {this.state.k2Tips}</Text>
          <Text>K3: {this.state.k3Tips}</Text>
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