import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import {useSubscription} from 'react-apollo-hooks';
import {NEWMESSAGE} from '../screens/message/MessageQueries';
import {
  useUserInfo,
  useSetMessages,
  useLoading,
  useSetLoading,
  useSetUserInfo,
} from '../AuthContext';
import {GETUSER} from '../screens/home/HomeQueries';
import Room from '../screens/message/Room';

const MainNavigation = createStackNavigator();

export default () => {
  const userInfo = useUserInfo();
  const setUserInfo = useSetUserInfo();
  const tempUserInfo = {...userInfo};
  const setMessages = useSetMessages();
  const setLoading = useSetLoading();
  /*const {loading: getUserLoading, data: getUserData, refetch} = useQuery(
    GETUSER,
  );
  */
  console.log('this is userInfo');
  console.log(userInfo.user.id);
  const {
    loading: newMessageLoding,
    data: newMessageData,
    error,
  } = useSubscription(NEWMESSAGE, {
    variables: {userId: userInfo.user.id},
  });
  //초기 유저 데이터 userEffect
  /*useEffect(() => {
    console.log('userdata');
  }, [getUserData]);
  */
  //메세지 데이터 useEffect
  useEffect(() => {
    console.log('subsub');
    if (newMessageData) {
      setMessages(newMessageData.newMessage.data);

      console.log(tempUserInfo.rooms);

      const index = tempUserInfo.rooms.findIndex((room) => {
        if (room.id === newMessageData.newMessage.room.id) {
          console.log('number:' + room.messages.length);
          return true;
        }
      });
      tempUserInfo.rooms[index].messages.push({...newMessageData.newMessage});
      console.log('number2:' + tempUserInfo.rooms[index].messages.length);
      console.log('after add');
      console.log(tempUserInfo.rooms);
      setUserInfo({...tempUserInfo});
    }
  }, [newMessageData]);

  return (
    //subscripttion연결
    //newMessage올 경우. 그걸 authContext의 userInfo 갱신해준다.
    //방법 1 userInfo props 보내준다. 그러면 자동으로 리렌더링이 되니까
    //방법 2 userInfo context에서 관리. 근데 문제는 context는 리렌더링을 안 시켜준다.

    <NavigationContainer>
      <MainNavigation.Navigator headerMode="none">
        <MainNavigation.Screen name="Tab" children={() => <TabNavigation />} />
        <MainNavigation.Screen
          name="Room"
          component={Room}
          options={{headerShown: true, headerTitle: 'ddd'}}
        />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};
