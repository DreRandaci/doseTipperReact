import React from 'react';
import { 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import styles from '../styles/MurphyStyles';
import Tips from '../components/Tips';
import { CheckBox, } from 'react-native-elements';
import { Col } from 'react-native-easy-grid';

export default class Shifts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barBackChecked: false,
            enteredTips: '',        
            selectedShift: {shift: '6am - 1pm', hours: 7, checked: true},
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
                            
                        <View>

                            <View style={styles.shiftInfoContainer}>
                                <Text style={styles.shiftInfo}>Tips: ${this.state.enteredTips ? this.state.enteredTips : 0}</Text>
                            </View>

                            <View style={styles.shiftInfoContainer}>
                                <Text style={styles.shiftInfo}>Shift: {this.state.selectedShift.shift}</Text>
                            </View>

                            <View style={styles.shiftInfoContainer}>
                                <Text style={styles.shiftInfo}>Shift Hours: {this.state.selectedShift.hours}</Text>        
                            </View>
                        
                        </View>
                    </View>
                </Col>

                <Col style={styles.rightCol}>            

                    <Tips 
                        employees={this.state.employees}
                        enteredTips={this.state.enteredTips}
                        selectedShift={this.state.selectedShift}
                        barBackChecked={this.state.barBackChecked}/>

                </Col>

            </View>
        );
    }
}