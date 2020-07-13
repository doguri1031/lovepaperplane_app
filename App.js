import React, {useState, useEffect} from 'react';
import {ApolloProvider} from 'react-apollo-hooks';
import {ThemeProvider} from "styled-components"; 
import apolloClient from "./apolloClient";
import {StyleSheet, Text, View,AsyncStorage} from 'react-native';
//import {AsyncStorage} from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthProvider } from './AuthContext';
import theme from "./theme";
import NavController from './components/NavController';

export default function Pre() {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const preLoad = async() => {
        try{
          const apClient = await apolloClient();
          //await AsyncStorage.setItem("isLoggedIn","true");
          await AsyncStorage.removeItem("isLoggedIn");
          const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
          if(isLoggedIn===null||isLoggedIn==="false"){
            setIsLoggedIn(false);
          }else{
            setIsLoggedIn(true);
          }
          setLoaded(true);
          setClient(apClient);
        }catch(e){
          console.log(e);
        }
    
      }
      useEffect(()=>{
        preLoad();
      },[]);
    
    return loaded && client &&isLoggedIn!==null? (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <AuthProvider isLoggedIn={isLoggedIn}>
                <NavController/>
              </AuthProvider>
            </ThemeProvider>
        </ApolloProvider>
    ): (<View style={{flex:1 ,justifyContent:"center",alignItems:"center"}}><Text>dssssssssssssssssssssssssssssssddddddddddddddddddddssss</Text></View>);;
}


