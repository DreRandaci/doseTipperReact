import React from 'react';
import { 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import styles from '../styles/MurphyStyles';
import { CheckBox, } from 'react-native-elements';

export default class Shifts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barBackChecked: false,
        }
    }

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

    toggleBarback = () => 
        this.setState({barBackChecked: !this.state.barBackChecked});

    render() {
        return(
            <View>
                <Text style={styles.headings}>Select Shift</Text>      

                <View style={styles.shiftListContainer}>        
                  <FlatList
                    style={styles.flatList}
                    data={this.props.allShifts}
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
                
                <View>

                  <View style={styles.shiftInfoContainer}>
                    <Text style={styles.shiftInfo}>Tips: ${this.props.enteredTips ? this.props.enteredTips : 0}</Text>
                  </View>

                  <View style={styles.shiftInfoContainer}>
                    <Text style={styles.shiftInfo}>Shift: {this.props.selectedShift.shift}</Text>
                  </View>

                  <View style={styles.shiftInfoContainer}>
                    <Text style={styles.shiftInfo}>Shift Hours: {this.props.selectedShift.hours}</Text>        
                  </View>
                  
                </View>
            </View>
        );
    }
}