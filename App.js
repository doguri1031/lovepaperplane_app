import React, {useState, useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import {ApolloProvider} from 'react-apollo-hooks';
import {ThemeProvider} from "styled-components"; 
import apolloClient from "./apolloClient";
import {StyleSheet, Text, View,AsyncStorage} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { AuthProvider } from './AuthContext';
import theme from "./theme";
import NavController from './components/NavController';

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const preLoad = async() => {
        try{
          await Font.loadAsync({
          ...Ionicons.font
          });
          
          const apClient = await apolloClient();
          await AsyncStorage.setItem("isLoggedIn","true");
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
    ): (<AppLoading />);;
}


