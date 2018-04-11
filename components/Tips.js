import React from 'react';
import { 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import styles from '../styles/MurphyStyles';

export default class Tips extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
            
    //     };
    // }

    // TODO: Add calculate2HrTips() 
    
    calculateTips = () => {
        if(this.props.enteredTips > 0 && this.props.selectedShift.hours > 0) {
          // Initialized variables
          let bbTips;
          let shiftHrs = this.props.selectedShift.hours;
          let enteredTips = this.props.enteredTips;
          let kitchenTips = this.props.enteredTips*0.2;
          
          // Calculates bar back tips 
          if(this.props.barBackChecked) {
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
          
          let employeeTips = this.props.employees.map((val, i) => {
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

    renderTips = (item) => 
        <View style={styles.tipView}>
            <Text style={styles.tipEmp}>{item.item.emp}</Text>
            <Text style={styles.tipTotal}>${item.item.tips ? item.item.tips : 0}
            </Text>
        </View>;

    render() {
        return (
            <View>
                
                <Text style={styles.headings}>Tips</Text>

                <View>

                    <View style={styles.tipListContainer}>
                        <FlatList 
                            style={styles.flatList}
                            data={this.props.employees}
                            keyExtractor={(item, index) => index}
                            renderItem={(item) => this.renderTips(item)}
                        />              
                    </View>

                </View>

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