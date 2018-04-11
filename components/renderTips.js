import React from 'react';
import { 
    Text, 
    View, } from 'react-native';
import styles from '../styles/styles';

export default class RenderTips extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.tipView}>
                <Text style={styles.tipEmp}>{this.props.item.item.emp}</Text>
                <Text style={styles.tipTotal}>${this.props.item.item.tips ? this.props.item.item.tips : 0}
                </Text>
            </View>
        );
    }
}