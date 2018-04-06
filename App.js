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
        showTips: false,
        barBackChecked: false,
        enteredTips: '',
        calculatedTips: '',
        allShifts: [
          {shift: '6am - 1pm', hours: 7},
          {shift: '7am - 1pm', hours: 6},
          {shift: '1pm - 7pm', hours: 6},
          {shift: '1pm - 3pm', hours: 2}
        ],
        selectedShift: [{}],
        baristaTips: '',
        cashierTips: '',
        barbackTips: '',
        k1Tips: '',
        k2Tips: '',
        k3Tips: '',
      };
    }
  
    toggleBarback = () => 
      this.setState({barBackChecked: !this.state.barBackChecked});

    selectShift = (shift) =>  
      this.setState({
        selectedShift: shift
      }); 

    // Calculates barista and cashier tips 
    calculateBarTips = (enteredTips, kitchenTips) => (enteredTips-kitchenTips)/2;

    // Calculates K1 and K2 tips before 9am
    calculateKitchTips = (kitchenTipsPerHr, hrs) => 
      hrs === 7 ? kitchenTipsPerHr*3/2 : kitchenTipsPerHr*2/2;


    calculate2HrTips() {

    }

    calculateTips() {
      if(this.state.enteredTips > 0 && this.state.selectedShift.hours > 0) {
        // Initialized variables
        let bbTips;
        let shiftHrs = this.state.selectedShift.hours;
        let enteredTips = this.state.enteredTips;
        let kitchenTips = this.state.enteredTips*0.2;
        
        // Calculates bar back tips 
        if(this.state.barBackChecked) {
          bbTips = enteredTips*0.2;
          enteredTips -= bbTips;
        }

        // Calculates barista and cashier tips
        let baristaTips = this.calculateBarTips(enteredTips, kitchenTips);
        let cashierTips = this.calculateBarTips(enteredTips, kitchenTips);

        // Calculates average kitchen tips per hour
        let kitchenTipsPerHr = kitchenTips/shiftHrs;
        
        // Calculates K1 and K2 tips before 9am
        let k1Tips = this.calculateKitchTips(kitchenTipsPerHr, shiftHrs);
        let k2Tips = this.calculateKitchTips(kitchenTipsPerHr, shiftHrs);
        
        // Calculates tips from 9am-1pm
        let averageTipsAfterFirstPayout = kitchenTipsPerHr*4/3;

        // Calculates tips for K3 
        let k3Tips = averageTipsAfterFirstPayout;

        // Adds remaining tips to K1 and K2 from 9am-1pm block
        k1Tips+=averageTipsAfterFirstPayout; 
        k2Tips+=averageTipsAfterFirstPayout; 

        this.setState({
          showTips: true,
          baristaTips: baristaTips, 
          cashierTips: cashierTips, 
          barbackTips: bbTips, 
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
        
        {/* <CheckBox
          center
          title='6am - 1pm'
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='add'
          checkedColor='red'
          checked={this.state.checked}
        /> */}

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
          onPress={this.state.selectedShift.hours === 2 ? this.calculate2HrTips.bind(this) : this.calculateTips.bind(this)}
          title='Calculate Tips'
          color='gold'
          backgroundColor='black'
        />

        <View style={{display: this.state.showTips ? '' : 'none'}}>
          <Text>Barista: {this.state.baristaTips}</Text>
          <Text>Cashier: {this.state.cashierTips}</Text>
          <Text style={{display: this.state.barBackChecked ? '' : 'none'}}>Barback: {this.state.barbackTips}</Text>
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