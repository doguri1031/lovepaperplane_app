import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfile from '../screens/setting/EditProfile';
import SettingList from '../screens/setting/SettingList';
import EditNickName from '../screens/setting/EditNickName';
import EditBirthDay from '../screens/setting/EditBirthDay';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName={'SettingList'}>
      <Stack.Screen name="SettingList" component={SettingList} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditNickName" component={EditNickName} />
      <Stack.Screen name="EditBirthDay" component={EditBirthDay} />
    </Stack.Navigator>
  );
};
