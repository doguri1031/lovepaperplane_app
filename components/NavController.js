import React, {useState} from "react";
import { View,Text} from "react-native";
import {useIsLoggedIn} from "../AuthContext";
import MainNavigation from "../navigation/MainNavigation";
<<<<<<< HEAD
=======
import AuthNavigation from "../navigation/AuthNavigation";
>>>>>>> react native cli
export default () => {
    const isLoggedIn = useIsLoggedIn();
    return (
        <View style={{flex:1}}>
            {isLoggedIn &&
               <MainNavigation/>
            }
            {!isLoggedIn &&
<<<<<<< HEAD
                <Text>Login!!</Text>
=======
                <AuthNavigation/>
>>>>>>> react native cli
            }
        </View>
    );

}