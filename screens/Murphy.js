import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import styles from '../styles/styles';
import RenderTips from '../components/renderTips';
import assignTips from '../methods/assignTips';
import { Button, CheckBox } from 'react-native-elements';
import { Col, Grid } from 'react-native-easy-grid';
import { Header, Icon, Right, Body, Title, Left } from 'native-base';

export default class Murphy extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Murphy',         
    };

    constructor(props) {
      super(props);      
      this.state = {        
        barBackChecked: false,
        barBackDisabled: false,        
        enteredTips: '',
        allShifts: [
          {shift: '6am - 1pm', hours: 7, checked: true},
          {shift: '7am - 1pm', hours: 6, checked: false},
          {shift: '1pm - 3pm', hours: 2, checked: false},
          {shift: '3pm - 7pm', hours: 4, checked: false},
        ],
        employees: [
          {emp: 'Barista', tips: 0},
          {emp: 'Cashier', tips: 0},
          {emp: 'Barback', tips: 0},
          {emp: 'K1', tips: 0},
          {emp: 'K2', tips: 0},
          {emp: 'K3', tips: 0},
          {emp: 'K4', tips: 0},
        ],
        selectedShift: {shift: '6am - 1pm', hours: 7, checked: true},
      };      
    }

    clearAll = () => {
        this.setState({
            allShifts: [
                {shift: '6am - 1pm', hours: 7, checked: false},
                {shift: '7am - 1pm', hours: 6, checked: false},
                {shift: '1pm - 3pm', hours: 2, checked: false},
                {shift: '3pm - 7pm', hours: 4, checked: false},
            ],
            employees: [
                {emp: 'Barista', tips: 0},
                {emp: 'Cashier', tips: 0},
                {emp: 'Barback', tips: 0},
                {emp: 'K1', tips: 0},
                {emp: 'K2', tips: 0},
                {emp: 'K3', tips: 0},
                {emp: 'K4', tips: 0},
            ],
            selectedShift: {}
        });
    };
  
    toggleBarback = () => 
      this.setState({barBackChecked: !this.state.barBackChecked});

    selectShift = (shift) => {
        // checks if the shift is 4 hours and, if so, removes barback tip potential completely 
        if(shift.item.hours === 4) {
            this.setState({barBackDisabled: true, barBackChecked: false});
        } else {
            this.setState({barBackDisabled: false});
        }

        shift.item.checked = !shift.item.checked;
        // loop over allShifts and toggle checks for each shift
        let newShifts = this.state.allShifts.map((val,i) => {
            // if the shift is the pressed shift, change selected value of pressed entry
            if (shift.index === i) {
                return { ...val }; 
            }
            // otherwise, uncheck the item and return current shift
            val.checked = false;
            return val;
        });
        this.setState({        
            allShifts: newShifts,
            selectedShift: shift.item                
        })
    }; 

    calculate2HrTips = () => {
        let shiftValues = {
            bbTips: 0,
            baristaTips: 0,
            k3Tips: 0,
            k4Tips: 0,
            shiftHrs: this.state.selectedShift.hours,
            enteredTips: this.state.enteredTips,
            kitchenTips: this.state.enteredTips*0.2,
        }

        if(this.state.barBackChecked) {
            shiftValues.bbTips = shiftValues.enteredTips*0.2;
        }   

        let k3k4tips = (shiftValues.enteredTips*0.2)/2;
        
        shiftValues.k3Tips = k3k4tips;
        shiftValues.k4Tips = k3k4tips;
        shiftValues.baristaTips = shiftValues.enteredTips-((k3k4tips*2)+shiftValues.bbTips);
        
        this.setState({
            employees: [
                {emp: 'Barista', tips: shiftValues.baristaTips.toFixed(2)},
                {emp: 'Cashier', tips: 0},
                {emp: 'Barback', tips: shiftValues.bbTips > 0 ? shiftValues.bbTips.toFixed(2) : 0},
                {emp: 'K1', tips: 0},
                {emp: 'K2', tips: 0},
                {emp: 'K3', tips: shiftValues.k3Tips.toFixed(2)},
                {emp: 'K4', tips: shiftValues.k4Tips.toFixed(2)},
            ],
        });

    } 

    calculate4HrTips = () => {
        let shiftHrs = this.state.selectedShift.hours;
        let enteredTips = this.state.enteredTips;
        let kitchenTips = this.state.enteredTips*0.2;

        let k4Tips = (enteredTips*0.2);
        let baristaTips = enteredTips-k4Tips;
        
        this.setState({
            employees: [
                {emp: 'Barista', tips: baristaTips.toFixed(2)},
                {emp: 'Cashier', tips: 0},
                {emp: 'Barback', tips: 0},
                {emp: 'K1', tips: 0},
                {emp: 'K2', tips: 0},
                {emp: 'K3', tips: 0},
                {emp: 'K4', tips: k4Tips},
            ],
        });

    }

    calculateTips = () => {
      if(this.state.enteredTips > 0 && this.state.selectedShift.hours > 0) {
        
        if(this.state.selectedShift.hours === 2) {
            this.calculate2HrTips();
            return;
        }

        if(this.state.selectedShift.hours === 4) {
            this.calculate4HrTips();
            return;
        }

        let shiftValues = {
            bbTips: 0,
            bariAndCashiTips: 0,
            kitchenTipsPerHr: 0,
            k1k2Tips: 0,
            averageTipsAfterFirstPayout: 0,
            k3Tips: 0,
            shiftHrs: this.state.selectedShift.hours,
            enteredTips: this.state.enteredTips,
            kitchenTips: this.state.enteredTips*0.2,
        }
        
        // Calculates bar back tips 
        if(this.state.barBackChecked) {
          shiftValues.bbTips = shiftValues.enteredTips*0.2;
          shiftValues.enteredTips -= shiftValues.bbTips;
        }        

        // Calculates barista and cashier tips
        shiftValues.bariAndCashiTips = (shiftValues.enteredTips-shiftValues.kitchenTips)/2;

        // Calculates average kitchen tips per hour
        shiftValues.kitchenTipsPerHr = shiftValues.kitchenTips/shiftValues.shiftHrs;
        
        // Calculates K1 and K2 tips before 9am
        shiftValues.k1k2Tips = shiftValues.shiftHrs === 7 ? shiftValues.kitchenTipsPerHr*3/2 : shiftValues.kitchenTipsPerHr*2/2;
        
        // Calculates tips from 9am-1pm
        shiftValues.averageTipsAfterFirstPayout = shiftValues.kitchenTipsPerHr*4/3;

        // Calculates tips for K3 
        shiftValues.k3Tips = shiftValues.averageTipsAfterFirstPayout;

        // Adds remaining tips to K1 and K2 from 9am-1pm block
        shiftValues.k1k2Tips+=shiftValues.averageTipsAfterFirstPayout; 
        
        let employeeTips = assignTips.assignTips(this.state.employees, shiftValues);

        this.setState({
          employees: employeeTips,
        });
      }
    }

    renderShifts = (item) =>
        <View style={styles.shiftBtn}>
            <CheckBox
            checked={item.item.checked}
            onPress={this.selectShift.bind(this, item)}
            iconRight
            center
            checkedColor='#F7DC1B'
            title={item.item.shift}
            checkedIcon='check'
            uncheckedIcon='circle-o'   
            />
          </View>;
          
    render() {

        return (
        <View style={styles.container}>        
            <Header style={{backgroundColor:'#7dadd4'}}>     
                <Left/>   
                <Body>
                    <Title>Murphy</Title>
                </Body>
                <Right>
                    <Icon 
                        name='ios-menu'
                        onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    />
                </Right>
            </Header>
            <Grid style={styles.grid}>        
                {/* Inline width styling because of bug in React Native Easy Grid library. Because of that, all styles for the left column have to live in the view element */}
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

                        <View 
                            style={styles.barbackContainer}
                            pointerEvents={this.state.barBackDisabled ? 'none' : ''}>

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
                                <Text style={styles.shiftInfo}>Total Tips: ${this.state.enteredTips ? this.state.enteredTips : 0}</Text>
                            </View>

                            <View style={styles.shiftInfoContainer}>
                                <Text style={styles.shiftInfo}>Shift: {this.state.selectedShift.shift}</Text>
                            </View>

                            <View style={styles.shiftInfoContainer}>
                                <Text style={styles.shiftInfo}>Shift Hours: {this.state.selectedShift.hours}</Text>        
                            </View>

                            <View style={styles.shiftInfoContainer}>
                                <Text style={styles.shiftInfo}>Barback: {this.state.barBackChecked ? 'Yes' : 'No'}</Text>
                            </View>

                        </View>
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
                            renderItem={(item) => <RenderTips item={item}/>}
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

                </Col>

            </Grid>

        </View>
        );
    }
}