import React from 'react';
import { 
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage } from 'react-native';
import styles from '../styles/styles';
import { Button, CheckBox } from 'react-native-elements';
import { Col, Grid } from 'react-native-easy-grid';
import { Header, Icon, Right, Left, Body, Title } from 'native-base';

export default class Riverside extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Set Default Store',
    };
    
    constructor(props) {
        super(props);      
        this.state = {
            murphyChecked: false,
            riversideChecked: false,
            store: ''           
        }
    }

    componentDidMount() {
        AsyncStorage.setItem('storePreference', JSON.stringify({store: 'HEY'}));
        AsyncStorage.getItem('storePreference').then((res) => {
            // If there is a preference, update the state
            if (res !== null) {
                this.setState({store: JSON.parse(res.store)});
            } 
        });
    };

    selectStore = (store) => {        
        store == 'murphy' 
            ? this.setState({murphyChecked: true, riversideChecked: false, store: store}) 
            : this.setState({riversideChecked: true, murphyChecked: false, store: store});
            AsyncStorage.setItem('storePreference', JSON.stringify(this.state.store))        
    };

    render() {
        return(
            <View>
                <CheckBox
                    checked={this.state.murphyChecked}
                    onPress={this.selectStore.bind(this, 'murphy')}
                    iconRight
                    center
                    checkedColor='#F7DC1B'
                    title='Murphy'
                    checkedIcon='check'
                    uncheckedIcon='circle-o'   
                    />
                    
                    <CheckBox
                    checked={this.state.riversideChecked}
                    onPress={this.selectStore.bind(this, 'riverside')}
                    iconRight
                    center
                    checkedColor='#F7DC1B'
                    title='Riverside'
                    checkedIcon='check'
                    uncheckedIcon='circle-o'   
                    />
                    <Text>Store: {this.state.store}</Text>
            </View>
        );
    }

}