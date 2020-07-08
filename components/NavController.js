import React, {useState} from "react";
import { View,Text} from "react-native";
import {useIsLoggedIn} from "../AuthContext";
import MainNavigation from "../navigation/MainNavigation";
export default () => {
    const isLoggedIn = useIsLoggedIn();
    return (
        <View style={{flex:1}}>
            {isLoggedIn &&
               <MainNavigation/>
            }
            {!isLoggedIn &&
                <Text>Login!!</Text>
            }
        </View>
    );

}