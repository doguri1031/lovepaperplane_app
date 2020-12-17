import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useIsLoggedIn} from '../AuthContext';
import MainNavigation from '../navigation/MainNavigation';
import AuthNavigation from '../navigation/AuthNavigation';
export default () => {
  const isLoggedIn = useIsLoggedIn();
  console.log('NavController 1');
  return (
    <View style={{flex: 1}}>
      {isLoggedIn && <MainNavigation />}
      {!isLoggedIn && <AuthNavigation />}
    </View>
  );
};
