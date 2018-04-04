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
import { CheckBox } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barBackChecked: false,
      enteredTips: '',
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
  
  toggleBarback() {
    this.setState({barBackChecked: !this.state.barBackChecked})
  }

  selectShift(shift) { 
    this.setState({
      selectedShift: shift
    }); 
  }  

  calculateTips() {
    if(this.state.enteredTips > 0 && this.state.selectedShift.hours > 0) {      
      let enteredTips = this.state.enteredTips;
      let kitchenTips = this.state.enteredTips*0.2;
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

    setSelectedOption = (selectedOption) =>
      this.setState({
        selectedOption
      });    

    return (
      <View style={styles.container}>
        
        <Text style={styles.heading}>Dose Tipper</Text>        
        
        <View>
          <TextInput
          placeholder={'Enter Total Tips'}
          clearTextOnFocus={true}          
          style={styles.enterTips} 
          maxLength={40}
          onChangeText={(tips) => this.setState({enteredTips: tips})}
          value={this.state.enteredTips}/>
        </View>

        <Text style={styles.shifts}>Select Shift</Text>
        
        <CheckBox
          center
          title='6am - 1pm'
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='add'
          checkedColor='red'
          checked={this.state.checked}
        />

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
        
        <Text style={{color: 'red'}}>Shift: {this.state.selectedShift.shift}</Text>
        <Text style={{color: 'red'}}>Shift Hours: {this.state.selectedShift.hours}</Text>        
        
        <CheckBox
          onPress={ this.toggleBarback.bind(this) }
          iconRight
          center
          title='Barback'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.barBackChecked}
        />

        <Button
          onPress={this.calculateTips.bind(this)}
          title='Get Tips'
          color='gold'
          backgroundColor='black'
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