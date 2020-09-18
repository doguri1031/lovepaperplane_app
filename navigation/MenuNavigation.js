import {View, Text, Button, Dimensions} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import LeftSideBar from '../sidebar/leftsidebar';
import Room from '../screens/message/Room';
const WIDTH = Dimensions.get('window').width;
const RightDrawer = createDrawerNavigator(
  {
    Room: {screen: Room},
  },
  {
    initialRouteName: 'Login',
    drawerWidth: WIDTH * 0.8,
    drawerPosition: 'Right',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    contentComponent: (props) => <LeftSideBar {...props} />,
    drawerOpenRoute: 'RightSideMenu',
    drawerCloseRoute: 'RightSideMenuClose',
    drawerToggleRoute: 'RightSideMenuToggle',
  },
);
export default RightDrawer;
