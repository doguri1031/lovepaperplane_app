import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoomList from '../screens/message/RoomList';
import Room from '../screens/message/Room';
const MessageNavigation = createStackNavigator();

export default () => (
  <MessageNavigation.Navigator headerMode="none">
    <MessageNavigation.Screen name="RoomList" component={RoomList} />
  </MessageNavigation.Navigator>
);
