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
        AsyncStorage.getItem('storePreference')
        .then((res) => {
            if (res !== null) {
                res.json();
            } else {
                return;
            }
        }).then((r) => {
            // If there is a preference, update the state
            if (r !== null) {
                this.setState({store: JSON.parse(res.store)});
            }
        })
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
                <Header style={{backgroundColor:'#7dadd4'}}>
                    <Left/>
                    <Body>
                        <Title>Store Preferences</Title>
                    </Body>
                    <Right>
                        <Icon
                            name='ios-menu'
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        />
                    </Right>
                </Header>
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