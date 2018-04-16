import { DrawerNavigator } from 'react-navigation';
import Murphy from '../screens/Murphy';
import Riverside from '../screens/Riverside';
import SetDefaultStore from '../screens/SetDefaultStore';
import styles from '../styles/styles';

const Drawer = DrawerNavigator(
    {
        Murphy: {
            screen: Murphy,
        },
        Riverside: {
            screen: Riverside,
        },
        SetDefaultStore: {
            screen: SetDefaultStore
        },
    },
    {
        initialRouteName: 'SetDefaultStore',
        drawerPosition: 'right',
        drawerBackgroundColor: '#6da6c7', 
        contentOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#0D6B7F'
        }       
    }
);

export default Drawer;
