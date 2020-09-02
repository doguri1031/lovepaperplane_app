import 'react-native-gesture-handler';
import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavIcon from '../components/NavIcon';
import Home from '../screens/home/Home';
import HomeNavigation from './HomeNavigation';
import RoomList from '../screens/message/RoomList';
import MessageNavigation from './MessageNavigation';
import SettingNavigation from './SettingNavigation';

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator
      initialRouteName="Home"
      tabBarOptions={{showLabel: false}}>
      <TabNavigation.Screen
        name="HomeNavigation"
        children={() => <HomeNavigation />}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
            />
          ),
        }}
      />
      <TabNavigation.Screen
        name="MessageNavigation"
        children={() => <MessageNavigation />}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'}
            />
          ),
        }}
      />
      <TabNavigation.Screen
        name="setting"
        component={SettingNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
            />
          ),
        }}
      />
    </TabNavigation.Navigator>
  );
};
