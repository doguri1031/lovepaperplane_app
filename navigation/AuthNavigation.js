import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Main from '../screens/auth/Main';
import SignUp from '../screens/auth/SignUp';
import SecretConfirm from '../screens/auth/SecretConfirm';
import RequestSecret from '../screens/auth/RequestSecret';
const AuthNavigation = createStackNavigator();

export default () => (
  <NavigationContainer>
    <AuthNavigation.Navigator headerMode="none">
      <AuthNavigation.Screen name="Main" component={Main} />
      <AuthNavigation.Screen name="SignUp" component={SignUp} />
      <AuthNavigation.Screen name="SecretConfirm" component={SecretConfirm} />
      <AuthNavigation.Screen name="RequestSecret" component={RequestSecret} />
    </AuthNavigation.Navigator>
  </NavigationContainer>
);
