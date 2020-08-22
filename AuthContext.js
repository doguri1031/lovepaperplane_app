import React, {createContext, useContext, useState} from 'react';
import {AsyncStorage} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [userInfo, setUserInfo] = useState('');
  const [messages, setMessages] = useState('');
  const [loading, setLoading] = useState(true);
  const logUserIn = async (user) => {
    try {
      console.log('auth conetext: ' + user.user.id);
      await AsyncStorage.setItem('token', user.user.id);
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
      value={{
        isLoggedIn,
        logUserIn,
        logUserOut,
        userInfo,
        messages,
        setMessages,
        loading,
        setLoading,
        setUserState,
      }}>
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

//TODO
export const useMessages = () => {
  const {messages} = useContext(AuthContext);
  return messages;
};
export const useSetMessages = () => {
  const {setMessages} = useContext(AuthContext);
  return setMessages;
};
//TODO
export const useLoading = () => {
  const {loading} = useContext(AuthContext);
  return loading;
};
export const useSetLoading = () => {
  const {setLoading} = useContext(AuthContext);
  return setLoading;
};
export const useUserState = () => {
  const {setUserState} = useContext(AuthContext);
  return setUserState;
};
