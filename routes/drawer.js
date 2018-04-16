import { DrawerNavigator } from 'react-navigation';
import Murphy from '../screens/Murphy';
import Riverside from '../screens/Riverside';

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
        drawerPosition: 'right'
    }
);

export default Drawer;
