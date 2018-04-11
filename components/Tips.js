import React from 'react';
import { 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import styles from '../styles/MurphyStyles';

export default class Tips extends React.Component {
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
            </View>
        );
    }
}