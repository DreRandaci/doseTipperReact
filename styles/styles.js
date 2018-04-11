import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7dadd4',
    },
    grid: {
      marginTop: 80,
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      color: '#fff',    
      paddingLeft: 15,
    },
    shiftListContainer: {
      height: 250,
      flexDirection: 'row',
    },
    flatList: {
      padding: 5,
    },
    headings: {
      paddingLeft: 18,
      paddingBottom: 10,
      fontSize: 25,
      color: '#192C47'
    },
    listShift: {
      fontSize: 25
    },
    enterTips: {
      padding: 20,
    },
    barbackContainer: {
      width: 200,
      padding: 5,
    },
    rightCol: {
      marginTop: 40,
      paddingLeft: 15,
      paddingRight: 40,
      
    },
    leftCol: {
      borderColor: '#6da6c7',
      borderWidth: 1,
      borderRadius: 5,
      paddingTop: 40,
      paddingBottom: 30,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#6da6c7',
      shadowColor: '#4a4f52',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 2,
      shadowOpacity: .3,
    },
    shiftInfoContainer: {
      paddingLeft: 20,
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    shiftInfo: {
      color: '#0D6B7F'
    },
    calcTipsBtn: {
      fontSize: 35,
      color: '#fff',
      paddingTop: 40,
      paddingBottom: 18,        
    },
    clearBtn: {
      fontSize: 20,
      color: '#192C47',
      opacity: .9
    },
    bottomBtnsContainer: {
      alignItems: 'center',
      marginTop: -70,
    },
    tipListContainer: {
      height: 500
    },
    tipTotal: {
      color: '#F7DC1B',
      fontSize: 25,
      fontWeight: 'bold'
    },
    tipView: {
      flexDirection: 'row',
      margin: 5,
      marginLeft: 35,
      marginRight: 35,
      padding: 10,
      opacity: 1,
      borderBottomColor: '#c3d6e45e',
      borderBottomWidth: 1.5,    
      justifyContent: 'space-between'
    },
    tipEmp: {
      color: 'white',
      fontSize: 17
    },
});
export default styles;