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
import { Header, Icon, Right, Left, Body, Title } from 'native-base';

export default class Riverside extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Riverside',
    };
    
    constructor(props) {
        super(props);      
        this.state = {
            tipsPerEach: 0,
            empOnShift: 0,
            shiftHrs: 0,
            enteredTips: 0            
        }
    }

    calculateTips = () => {
        if(this.state.enteredTips > 0) {
            let tips = this.state.enteredTips/this.state.empOnShift;
            this.setState({tipsPerEach: tips.toFixed(2)});
        }
    };

    render() {
        return(
            <View style={styles.container}>
                <Header style={{backgroundColor:'#7dadd4'}}>
                    <Left/>   
                    <Body>
                        <Title>Riverside</Title>
                    </Body>
                    <Right>
                        <Icon 
                            name='ios-menu'
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        />
                    </Right>
                </Header>
                
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100, paddingBottom: 50}}>
                    <TextInput
                        keyboardType={'number-pad'}
                        autoFocus={true}
                        placeholder={'Enter Total Tips'}
                        clearTextOnFocus={true}          
                        // style={styles.enterTips} 
                        fontSize={20}
                        maxLength={40}
                        onChangeText={(tips) => this.setState({enteredTips: tips})}
                        value={this.state.enteredTips}/>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput
                        keyboardType={'number-pad'}
                        autoFocus={true}
                        placeholder={'Enter Number of Employees'}
                        clearTextOnFocus={true}          
                        // style={styles.enterTips} 
                        fontSize={20}
                        maxLength={40}
                        onChangeText={(tips) => this.setState({empOnShift: tips})}
                        value={this.state.empOnShift}/>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={this.calculateTips.bind(this)}>
                        <Text style={styles.calcTipsBtn}>Calculate Tips</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tipView}>
                    <Text style={styles.tipEmp}>Each</Text>
                    <Text style={styles.tipTotal}>${this.state.tipsPerEach > 0 ? this.state.tipsPerEach : 0}
                    </Text>
                </View>


            </View>
        );
    }

}