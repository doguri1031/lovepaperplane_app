import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfile from '../screens/setting/EditProfile';
import SettingList from '../screens/setting/SettingList';
import EditNickName from '../screens/setting/EditNickName';
import EditBirthDay from '../screens/setting/EditBirthDay';
import EditLocation from '../screens/setting/EditLocation';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName={'SettingList'}>
      <Stack.Screen name="SettingList" component={SettingList} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditNickName" component={EditNickName} />
      <Stack.Screen name="EditBirthDay" component={EditBirthDay} />
      <Stack.Screen name="EditLocation" component={EditLocation} />
    </Stack.Navigator>
  );
};
