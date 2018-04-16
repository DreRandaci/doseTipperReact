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
import { Header, Content, Container, Icon, Right } from 'native-base';

export default class Riverside extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Riverside',
    };
    
    constructor(props) {
      super(props);      
    }

    render() {
        return(
            <View style={styles.container}>
                <Header style={{backgroundColor:'#7dadd4'}}>
                <Right>
                    <Icon 
                        name='ios-menu'
                        onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    />
                </Right>
            </Header>
                
            </View>
        );
    }

}