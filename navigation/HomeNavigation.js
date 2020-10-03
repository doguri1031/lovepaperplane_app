import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/home/Home';
import CreateRoom from '../screens/home/CreateRoom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const AuthNavigation = createStackNavigator();

export default () => (
  <AuthNavigation.Navigator headerMode="none">
    <AuthNavigation.Screen name="Home" component={Home} />
  </AuthNavigation.Navigator>
);
