import React, {createContext, useContext, useState} from 'react';
import {AsyncStorage} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [userInfo, setUserInfo] = useState('');

  const logUserIn = async (user) => {
    try {
      console.log('auth conetext: ' + user.id);
      await AsyncStorage.setItem('token', user.id);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setUserInfo(user);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  const setUserState = (user) => {
    console.log(user.nickname);
    console.log('modified user data');
    setUserInfo(user);
  };

  return (
    <AuthContext.Provider
      value={{isLoggedIn, logUserIn, logUserOut, userInfo, setUserState}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogUserIn = () => {
  const {logUserIn} = useContext(AuthContext);
  return logUserIn;
};

export const userLogUserOut = () => {
  const {logUserOut} = useContext(AuthContext);
  return logUserOut;
};

export const useUserInfo = () => {
  const {userInfo} = useContext(AuthContext);
  return userInfo;
};

export const useUserState = () => {
  const {setUserState} = useContext(AuthContext);
  return setUserState;
};
