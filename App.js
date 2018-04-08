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
      // <View style={styles.container}>
      <View style={styles.container}>
        
        <Text style={styles.heading}>Dose Tipper</Text>


        <Grid>
            <Col style={{ width: 40 }}>
                <Text>Fixed width</Text>
            </Col>
            <Col>
                <Text>Fluid width</Text>
            </Col>
        </Grid>

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
            keyExtractor={item => item.shift}
            renderItem={({item, index}) => 
              
              <CheckBox
                key={index}
                onPress={this.selectShift.bind(this, item)}
                iconRight
                center
                title={item.shift}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.barBackChecked}
              />

              // <TouchableOpacity
              // onPress={this.selectShift.bind(this, item)}
              // >
              //   <Text style={styles.listShift}>{item.shift}
              //   </Text>
              // </TouchableOpacity>
              }
              
          />        
        </View>
        
        {/* <Text style={{color: 'red'}}>Shift: {this.state.selectedShift.shift}</Text>
        <Text style={{color: 'red'}}>Shift Hours: {this.state.selectedShift.hours}</Text>         */}
        
        <CheckBox
          onPress={ this.toggleBarback.bind(this) }
          iconRight
          center
          title='Barback     '
          checkedIcon='check'
          uncheckedIcon='circle-o'
          checked={this.state.barBackChecked}
        />

        <Button
          onPress={this.calculateTips.bind(this)}
          raised
          title='Calculate Tips'
          color='#fff'
          backgroundColor='#70a9ca9e'
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
  // container: {
  //   flex: 1,
  //   backgroundColor: '#70a9ca9e',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  container: {
    // flex: 1,
    backgroundColor: '#70a9ca9e',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff'    
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
  }
});

// Disables yellowbox warnings
console.disableYellowBox = true;