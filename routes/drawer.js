import { DrawerNavigator } from 'react-navigation';
import Murphy from '../screens/Murphy';
import Riverside from '../screens/Riverside';
import styles from '../styles/styles';

const Drawer = DrawerNavigator(
    {
        Murphy: {
            screen: Murphy,
        },
        Riverside: {
            screen: Riverside,
        },
    },
    {
        initialRouteName: 'Murphy',
        drawerPosition: 'right',
        drawerBackgroundColor: '#6da6c7',
        contentOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#0D6B7F'
        }
    }
);

export default Drawer;
