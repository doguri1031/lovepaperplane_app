import React, {useState, useEffect} from 'react';
<<<<<<< HEAD
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import {AppLoading} from "expo";
=======
>>>>>>> react native cli
import {ApolloProvider} from 'react-apollo-hooks';
import {ThemeProvider} from "styled-components"; 
import apolloClient from "./apolloClient";
import {StyleSheet, Text, View,AsyncStorage} from 'react-native';
<<<<<<< HEAD
import {StatusBar} from 'expo-status-bar';
=======
//import {AsyncStorage} from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
>>>>>>> react native cli
import { AuthProvider } from './AuthContext';
import theme from "./theme";
import NavController from './components/NavController';

<<<<<<< HEAD
export default function App() {
=======
export default function Pre() {
>>>>>>> react native cli
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const preLoad = async() => {
        try{
<<<<<<< HEAD
          await Font.loadAsync({
          ...Ionicons.font
          });
          
          const apClient = await apolloClient();
          await AsyncStorage.setItem("isLoggedIn","true");
=======
          const apClient = await apolloClient();
          //await AsyncStorage.setItem("isLoggedIn","true");
          await AsyncStorage.removeItem("isLoggedIn");
>>>>>>> react native cli
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
<<<<<<< HEAD
    ): (<AppLoading />);;
=======
    ): (<View style={{flex:1 ,justifyContent:"center",alignItems:"center"}}><Text>dssssssssssssssssssssssssssssssddddddddddddddddddddssss</Text></View>);;
>>>>>>> react native cli
}


