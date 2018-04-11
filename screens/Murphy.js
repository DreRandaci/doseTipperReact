import React from 'react';
import { 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import Tips from '../components/Tips';
import Shifts from '../components/Shifts';
import styles from '../styles/MurphyStyles';
import { Button, } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Murphy extends React.Component {
    constructor(props) {
      super(props);      
      this.state = {        
        enteredTips: '',
        allShifts: [
          {shift: '6am - 1pm', hours: 7, checked: true},
          {shift: '7am - 1pm', hours: 6, checked: false},
          {shift: '1pm - 3pm', hours: 2, checked: false},
          {shift: '1pm - 7pm', hours: 6, checked: false},
        ],
        employees: [
          {emp: 'Barista', tips: 0},
          {emp: 'Cashier', tips: 0},
          {emp: 'Barback', tips: 0},
          {emp: 'K1', tips: 0},
          {emp: 'K2', tips: 0},
          {emp: 'K3', tips: 0},
        ],
        selectedShift: {shift: '6am - 1pm', hours: 7, checked: true},
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
      this.initialState.employees = [
        {emp: 'Barista', tips: 0},
        {emp: 'Cashier', tips: 0},
        {emp: 'Barback', tips: 0},
        {emp: 'K1', tips: 0},
        {emp: 'K2', tips: 0},
        {emp: 'K3', tips: 0},
      ],
      this.initialState.selectedShift = {}; 
      this.setState(this.initialState);
    };
  
    // TODO: Add calculate2HrTips() 

    calculateTips = () => {
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
        
        let employeeTips = this.state.employees.map((val, i) => {
          switch (val.emp) {
            case 'Barista':
              val.tips = bariAndCashiTips;
              return val;
            case 'Cashier':
              val.tips = bariAndCashiTips
              return val;
            case 'Barback':
              val.tips = bbTips;
              return val;
            case 'K1': 
              val.tips = k1k2Tips;
              return val;
            case 'K2':
              val.tips = k1k2Tips 
              return val;
            case 'K3':
              val.tips = k3Tips;
              return val;
            break;
          }
        });
  
        this.setState({
          employees: employeeTips,
        });
      }
    }

  render() {

    return (
      <View style={styles.container}>
        
        <Grid style={styles.grid}>
          <Col style={{width: 350}}>
            <View style={styles.leftCol}>

              <Text style={styles.title}>Dose Tipper</Text>

              <View>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoFocus={true}
                    placeholder={'Enter Total Tips'}
                    clearTextOnFocus={true}          
                    style={styles.enterTips} 
                    fontSize={20}
                    maxLength={40}
                    onChangeText={(tips) => this.setState({enteredTips: tips})}
                    value={this.state.enteredTips}/>
              </View>

            <Shifts 
                enteredTips={this.state.enteredTips} 
                selectedShift={this.state.selectedShift}
                barBackChecked={this.state.barBackChecked}
                allShifts={this.state.allShifts}/>
                
            </View>

          </Col>

          <Col style={styles.rightCol}>            

            <Tips employees={this.state.employees}/>

            <View style={styles.bottomBtnsContainer}>

              <TouchableOpacity
                onPress={this.calculateTips.bind(this)}>
                  <Text style={styles.calcTipsBtn}>Calculate Tips</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={this.clearAll}>
                <Text style={styles.clearBtn}>Clear</Text>
              </TouchableOpacity>

            </View>

          </Col>

        </Grid>

      </View>
    );
  }
}