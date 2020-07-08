import 'react-native-gesture-handler';
import React from "react";
import {Platform} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import NavIcon from '../components/NavIcon';
import Home from "../screens/home/Home";
import RoomList from "../screens/message/RoomList";
import SettingList from "../screens/setting/SettingList";


const TabNavigation = createBottomTabNavigator();

export default () => {
    return (
            <TabNavigation.Navigator initialRouteName="Home" tabBarOptions={{showLabel:false}} >
                <TabNavigation.Screen name="Home" component={Home} options={{tabBarIcon:({focused})=><NavIcon focused={focused} name={Platform.OS==="ios"?"ios-home":"md-home"}/>}} />
                <TabNavigation.Screen name="roomList" component={RoomList} options={{tabBarIcon:({focused})=><NavIcon focused={focused} name={Platform.OS==="ios"?"ios-chatboxes":"md-chatboxes"}/>}}/>
                <TabNavigation.Screen name="setting" component={SettingList} options={{tabBarIcon:({focused})=><NavIcon focused={focused} name={Platform.OS==="ios"?"ios-settings":"md-settings"}/>}}/>
            </TabNavigation.Navigator>
           
    );
}