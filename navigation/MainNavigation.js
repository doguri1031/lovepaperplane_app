import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import {useSubscription} from 'react-apollo-hooks';
import {NEWMESSAGE} from '../screens/message/MessageQueries';
import {useUserInfo, useSetMessages} from '../AuthContext';

const MainNavigation = createStackNavigator();

export default () => {
  const userInfo = useUserInfo();
  const setMessages = useSetMessages();

  const {loading, data, error} = useSubscription(NEWMESSAGE, {
    variables: {userId: userInfo.id},
  });
  useEffect(() => {
    console.log('subsub');
    console.log(data);
    if (data) {
      setMessages(data.newMessage.data);
    }
  }, [data]);

  return (
    //subscripttion연결
    //newMessage올 경우. 그걸 authContext의 userInfo 갱신해준다.
    //방법 1 userInfo props 보내준다. 그러면 자동으로 리렌더링이 되니까
    //방법 2 userInfo context에서 관리. 근데 문제는 context는 리렌더링을 안 시켜준다.

    <NavigationContainer>
      <MainNavigation.Navigator headerMode="none">
        <MainNavigation.Screen name="Tab" children={() => <TabNavigation />} />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};
