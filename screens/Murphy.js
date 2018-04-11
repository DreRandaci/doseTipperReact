import React from 'react';
import { 
    Text, 
    View,
    TextInput,
    FlatList,
    TouchableOpacity, } from 'react-native';
import Shifts from '../components/Shifts';
import styles from '../styles/MurphyStyles';
import { Button, } from 'react-native-elements';
import { Grid } from 'react-native-easy-grid';

export default class Murphy extends React.Component {    
  
  render() {

    return (
      <View style={styles.container}>
        <Grid style={styles.grid}>
            <Shifts />
        </Grid>
      </View>
    );
  }
}