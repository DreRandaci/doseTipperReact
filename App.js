import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class App extends React.Component {
    constructor(props) {
      super(props);      
      this.state = {        
        barBackChecked: false,        
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

    renderShifts = (item) =>
        <CheckBox
          checked={item.item.checked}
          onPress={this.selectShift.bind(this, item)}
          iconRight
          center
          checkedColor='#F7DC1B'
          title={item.item.shift}
          checkedIcon='check'
          uncheckedIcon='circle-o'          
          />;
          
    renderTips = (item) => 
        <View style={styles.tipView}>
          <Text style={styles.tipEmp}>{item.item.emp}</Text>
          <Text style={styles.tipTotal}>${item.item.tips ? item.item.tips : 0}</Text>
        </View>;
    

  render() {

    return (
      <View style={styles.container}>
        
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

        <Grid style={styles.grid}>
          <Col style={styles.leftCol}>
            <Text style={styles.headings}>Select Shift</Text>      

            <View style={styles.shiftListContainer}>        
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
                checkedColor='#F7DC1B'
                title='Barback'
                checkedIcon='check'
                uncheckedIcon='circle-o'
                checked={this.state.barBackChecked}
              />
            </View>

            <View style={styles.shiftInfoContainer}>
              <Text style={styles.shiftInfo}>Shift: {this.state.selectedShift.shift}</Text>
              <Text style={styles.shiftInfo}>Shift Hours: {this.state.selectedShift.hours}</Text>        
            </View>

          </Col>

          <Col style={styles.rightCol}>            

            <Text style={styles.headings}>Tips</Text>

            <View>

              <View style={styles.tipListContainer}>
                <FlatList 
                  style={styles.flatList}
                  data={this.state.employees}
                  keyExtractor={(item, index) => index}
                  renderItem={(item) => this.renderTips(item)}
                />              
                              
              </View>

            </View>

          </Col>

        </Grid>

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#70a9ca9e',
    backgroundColor: '#7AB7E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    marginTop: 30,
  },
  title: {
    fontSize: 50,
    marginTop: 50,
    fontWeight: 'bold',
    color: '#fff',    
  },
  shiftListContainer: {
    height: 250,
    flexDirection: 'row',
  },
  flatList: {
    padding: 5,
  },
  headings: {
    marginTop: 10,
    fontSize: 25,
    color: '#192C47'
  },
  listShift: {
    fontSize: 25
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
    borderRightColor: 'white',
    borderRightWidth: 1,
  },
  rightCol: {
    alignItems: 'center',
  },
  shiftInfoContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  shiftInfo: {
    color: '#0D6B7F'
  },
  calcTipsBtn: {
    fontSize: 35,
    color: '#fff',
    paddingBottom: 12,    
  },
  clearBtn: {
    fontSize: 20,
    color: '#192C47'
  },
  bottomBtnsContainer: {
    alignItems: 'center',
    padding: 30
  },
  tipListContainer: {
    height: 500
  },
  tipTotal: {
    color: '#F7DC1B',
    fontSize: 20,
    fontWeight: 'bold'
  },
  tipView: {
    flexDirection: 'row',
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    opacity: 1,
    width: 300,    
    borderBottomColor: '#fff',
    borderBottomWidth: 1,    
    justifyContent: 'space-between'
  },
  tipEmp: {
    color: 'white'
  },
});

// Disables yellowbox warnings
console.disableYellowBox = true;