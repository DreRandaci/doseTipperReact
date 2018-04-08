import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    FlatList,
    Picker,
    Modal,
    TouchableOpacity, } from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class App extends React.Component {
    constructor(props) {
      super(props);      
      this.state = {        
        showTips: false,
        barBackChecked: false,        
        enteredTips: '',
        calculatedTips: '',
        allShifts: [
          {shift: '6am - 1pm', hours: 7, checked: false},
          {shift: '7am - 1pm', hours: 6, checked: false},
          {shift: '1pm - 3pm', hours: 2, checked: false},
          {shift: '1pm - 7pm', hours: 6, checked: false},
        ],
        selectedShift: [],
        baristaTips: '',
        cashierTips: '',
        barbackTips: '',
        k1Tips: '',
        k2Tips: '',
        k3Tips: '',
      };
      this.initialState = this.state;
    }

    clearAll = () => {
      this.initialState.allShifts = [
        {shift: '6am - 1pm', hours: 7, checked: false},
        {shift: '7am - 1pm', hours: 6, checked: false},
        {shift: '1pm - 7pm', hours: 6, checked: false},
        {shift: '1pm - 3pm', hours: 2, checked: false}
      ]; 
      this.setState(this.initialState);
    };
  
    toggleBarback = () => 
      this.setState({barBackChecked: !this.state.barBackChecked});

    selectShift = (shift) => {
      shift.item.checked = !shift.item.checked;
      // loop over allShifts and update checked vals
      let newShifts = this.state.allShifts.map((val,i) => {
        if (shift.index === i) {
            // change selected value of pressed entry
            return { ...val }; 
        }
        // otherwise, uncheck the item and return current value
        val.checked = false;
        return val;
      });
      this.setState({        
        allShifts: newShifts,
        selectedShift: shift.item                
      })
    }; 

    // TODO: Add calculate2HrTips() 

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
        let bariAndCashiTips = (enteredTips-kitchenTips)/2;

        // Calculates average kitchen tips per hour
        let kitchenTipsPerHr = kitchenTips/shiftHrs;
        
        // Calculates K1 and K2 tips before 9am
        let k1k2Tips = shiftHrs === 7 ? kitchenTipsPerHr*3/2 : kitchenTipsPerHr*2/2;
        
        // Calculates tips from 9am-1pm
        let averageTipsAfterFirstPayout = kitchenTipsPerHr*4/3;

        // Calculates tips for K3 
        let k3Tips = averageTipsAfterFirstPayout;

        // Adds remaining tips to K1 and K2 from 9am-1pm block
        k1k2Tips+=averageTipsAfterFirstPayout; 

        this.setState({
          showTips: true,
          baristaTips: bariAndCashiTips, 
          cashierTips: bariAndCashiTips, 
          barbackTips: bbTips, 
          k1Tips: k1k2Tips,
          k2Tips: k1k2Tips,
          k3Tips: k3Tips,
        });
      }
    }

    renderShifts = (item) =>
        <CheckBox
          checked={item.item.checked}
          onPress={this.selectShift.bind(this, item)}
          iconRight
          center
          checkedColor='gold'
          title={item.item.shift}
          checkedIcon='check'
          uncheckedIcon='circle-o'          
          />;    

  render() {

    return (
      <View style={styles.container}>
        
        <Text style={styles.heading}>Dose Tipper</Text>

        <Grid style={styles.grid}>
          <Col style={styles.leftCol}>
            <View>
              <TextInput
              placeholder={'Enter Total Tips'}
              clearTextOnFocus={true}          
              style={styles.enterTips} 
              fontSize={20}
              maxLength={40}
              onChangeText={(tips) => this.setState({enteredTips: tips})}
              value={this.state.enteredTips}/>
              
            </View>

            <Text style={styles.shifts}>Select Shift</Text>      

            <View style={styles.listContainer}>        
              <FlatList
                style={styles.flatList}
                data={this.state.allShifts}
                keyExtractor={(item, index) => index}
                renderItem={(item) => this.renderShifts(item)}
                />
            </View>
            <View style={styles.barbackContainer}>
              <CheckBox
                onPress={ this.toggleBarback.bind(this) }
                iconRight
                center
                checkedColor='gold'
                title='Barback'
                checkedIcon='check'
                uncheckedIcon='circle-o'
                checked={this.state.barBackChecked}
              />
            </View>
          </Col>

          <Col>
            <Text style={{color: 'red'}}>Shift: {this.state.selectedShift.shift}</Text>
            <Text style={{color: 'red'}}>Shift Hours: {this.state.selectedShift.hours}</Text>        

            <View style={{display: this.state.showTips ? '' : 'none'}}>
              <Text>Barista: {this.state.baristaTips}</Text>
              <Text>Cashier: {this.state.cashierTips}</Text>
              <Text style={{display: this.state.barBackChecked ? '' : 'none'}}>Barback: {this.state.barbackTips}</Text>
              <Text>K1: {this.state.k1Tips}</Text>
              <Text>K2: {this.state.k2Tips}</Text>
              <Text>K3: {this.state.k3Tips}</Text>
            </View>
          </Col>
          
        </Grid>

        <Button
          onPress={this.calculateTips.bind(this)}
          title='Calculate Tips'
          color='#fff'
          backgroundColor='#70a9ca9e'
        />

        <TouchableOpacity 
          onPress={this.clearAll}>
          <Text>Clear</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#70a9ca9e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  grid: {
    marginTop: 30,
  },
  heading: {
    fontSize: 50,
    marginTop: 50,
    fontWeight: 'bold',
    color: '#fff',    
  },
  listContainer: {
    height: 230,
    flexDirection: 'row',
  },
  flatList: {
    padding: 5,
  },
  shifts: {
    marginTop: 10,
    fontSize: 25,
  },
  listShift: {
    fontSize: 20
  },
  enterTips: {
    padding: 20,    
  },
  barbackContainer: {
    width: 200,
    padding: 5,
    marginTop: 5,
  },
  leftCol: {
    alignItems: 'center',
  }
});

// Disables yellowbox warnings
console.disableYellowBox = true;