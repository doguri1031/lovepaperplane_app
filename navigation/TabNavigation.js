import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {Badge} from '../components/Badge';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavIcon from '../components/NavIcon';
import Home from '../screens/home/Home';
import HomeNavigation from './HomeNavigation';
import RoomList from '../screens/message/RoomList';
import MessageNavigation from './MessageNavigation';
import SettingNavigation from './SettingNavigation';
import {useRoomsInfo, useUserInfo} from '../AuthContext';
import Upload from '../screens/message/Upload';

const TabNavigation = createBottomTabNavigator();

export default () => {
  const roomsInfo = useRoomsInfo();
  const userInfo = useUserInfo();
  const [isNewMessage, setIsNewMessage] = useState(false);

  useEffect(() => {
    let myReadFlg;
    let breakFlg = false;
    for (var i = 0; i < roomsInfo.length; i++) {
      myReadFlg = roomsInfo[i].readFlg[0].fromId === userInfo.id ? roomsInfo[i].readFlg[0] : roomsInfo[i].readFlg[1];
      for (var k = roomsInfo[i].messages.length - 1; k >= 0; k--) {
        if (roomsInfo[i].messages[k].createdAt > myReadFlg.checkedTime) {
          setIsNewMessage(true);
          breakFlg = true;
          break;
        }
      }
      if (breakFlg) {
        break;
      }
    }
    if (!breakFlg) {
      setIsNewMessage(false);
    }
  }, [roomsInfo]);
  return (
    <TabNavigation.Navigator initialRouteName="Home" tabBarOptions={{showLabel: false}}>
      <TabNavigation.Screen
        name="HomeNavigation"
        children={() => <HomeNavigation />}
        options={{
          tabBarIcon: ({focused}) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />,
        }}
      />
      <TabNavigation.Screen
        name="MessageNavigation"
        children={() => <MessageNavigation />}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
              {isNewMessage && <Badge text={'N'} color={'red'} size="small" top={5} left={75} />}
            </>
          ),
        }}
      />
      <TabNavigation.Screen
        name="setting"
        component={SettingNavigation}
        options={{
          tabBarIcon: ({focused}) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />,
        }}
      />
    </TabNavigation.Navigator>
  );
};
