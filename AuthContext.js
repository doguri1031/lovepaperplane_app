import React,{createContext, useContext, useState} from "react";
<<<<<<< HEAD
import {AsyncStorage} from "react-native";
=======
import { AsyncStorage } from 'react-native';
//import {AsyncStorage} from "@react-native-community/async-storage";
>>>>>>> react native cli

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn:isLoggedInProp,children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
    const [token, setToken] = useState();

    
    const logUserIn = async(token) =>{
        try{
            console.log("im in");
            console.log(token);
            await AsyncStorage.setItem("isLoggedIn","true");
            await AsyncStorage.setItem("token",token);
            
            setIsLoggedIn(true);
            console.log("isLoggedIn become true in AuthContext");
        }catch(e){
            console.log(e);
        }
    }

    const logUserOut = async()=>{
        try{
            await AsyncStorage.setItem("isLoggedIn","false");
            setIsLoggedIn(false);
        }catch(e){
            console.log(e);
        }
    }
    return <AuthContext.Provider value={{isLoggedIn,logUserIn,logUserOut,token}}>{children}</AuthContext.Provider>
}

export const useIsLoggedIn = () =>{
    const {isLoggedIn} = useContext(AuthContext);
    return isLoggedIn;
}

export const useLogUserIn = () => {
    const {logUserIn} = useContext(AuthContext);
    console.log("why");
    return logUserIn;
}

export const userLogUserOut = () => {
    const {logUserOut} = useContext(AuthContext);
    return logUserOut
}