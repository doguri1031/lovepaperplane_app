import 'react-native-gesture-handler';
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./TabNavigation";

const MainNavigation = createStackNavigator();

export default () => (
    <NavigationContainer>
            <MainNavigation.Navigator  headerMode="none" >
                <MainNavigation.Screen name="Tab" children={()=><TabNavigation />} />
            </MainNavigation.Navigator>
    </NavigationContainer>
);
