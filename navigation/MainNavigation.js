import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import {useMutation, useSubscription} from 'react-apollo-hooks';
import {MESSAGEREAD, NEWMESSAGE} from '../screens/message/MessageQueries';
import {useUserInfo, useSetMessages, useLoading, useSetLoading, useSetUserInfo, useRoomsInfo, useSetRoomsInfo} from '../AuthContext';
import Room from '../screens/message/Room';
import {SEEROOM} from '../screens/message/RoomsQueries';
import EditNickName from '../screens/setting/EditNickName';
import EditBirthDay from '../screens/setting/EditBirthDay';
import EditLocation from '../screens/setting/EditLocation';
import Accusation from '../screens/setting/Accusation';
import CreateRoom from '../screens/home/CreateRoom';

const MainNavigation = createStackNavigator();

export default () => {
  const userInfo = useUserInfo();
  const setUserInfo = useSetUserInfo();
  const tempUserInfo = {...userInfo};
  const setLoading = useSetLoading();
  const roomsInfo = useRoomsInfo();
  let tempRoomsInfo = [...roomsInfo];
  const setRoomsInfo = useSetRoomsInfo();
  const [seeRoomMutation] = useMutation(SEEROOM);
  /*const {loading: getUserLoading, data: getUserData, refetch} = useQuery(
    GETUSER,
  );
  */
  console.log('this is userInfo');
  console.log(userInfo.id);
  const {loading: newMessageLoding, data: newMessageData, error} = useSubscription(NEWMESSAGE, {
    variables: {userId: userInfo.id},
  });

  const {loading: messageReadLoading, data: messageReadData} = useSubscription(MESSAGEREAD, {
    variables: {userId: userInfo.id},
  });
  //초기 유저 데이터 userEffect
  /*useEffect(() => {
    console.log('userdata');
  }, [getUserData]);
  */

  //새로운 메세지 데이터 useEffect
  useEffect(() => {
    console.log('subsub');
    if (newMessageData) {
      const index = tempRoomsInfo.findIndex((room) => {
        if (room.id === newMessageData.newMessage.room.id) {
          console.log('number:' + room.messages.length);
          return true;
        }
      });
      if (index >= 0) {
        if (tempRoomsInfo[index].messages[tempRoomsInfo[index].messages.length - 1].id !== newMessageData.newMessage.id) {
          tempRoomsInfo[index].messages.push({...newMessageData.newMessage});
          console.log('number2:' + tempRoomsInfo[index].messages.length);
          console.log('after add');
          console.log(tempRoomsInfo);
          setRoomsInfo([...tempRoomsInfo]);
        }
      } else {
        console.log('aa');
        const seeRoomFunc = async (roomId) => {
          console.log('seeRoomMutation');
          console.log(roomId);
          const {data: seeRoom} = await seeRoomMutation({variables: {roomId}});
          console.log(seeRoom);
          console.log('damn man');
          return seeRoom;
        };
        seeRoomFunc(newMessageData.newMessage.room.id).then((seeRoom) => {
          console.log('seeRoom222');
          console.log(seeRoom);
          tempRoomsInfo.push(seeRoom.seeRoom);
          console.log('tempRoomsInfo');
          console.log([...tempRoomsInfo]);
          setRoomsInfo([...tempRoomsInfo]);
        });
      }
    }
  }, [newMessageData]);
  //기독 데이터 useEffect
  useEffect(() => {
    console.log('기독!');
    if (messageReadData) {
      const index = tempRoomsInfo.findIndex((room) => {
        if (room.id === messageReadData.messageRead.room.id) {
          return true;
        }
      });
      if (index >= 0) {
        for (var i = 0; i < tempRoomsInfo[index].readFlg.length; i++) {
          if (tempRoomsInfo[index].readFlg[i].id === messageReadData.messageRead.id) {
            tempRoomsInfo[index].readFlg[i] = messageReadData.messageRead;
            console.log('checkedTIme : ' + messageReadData.messageRead.checkedTime);

            break;
          }
        }
        setRoomsInfo([...tempRoomsInfo]);
      }
    }
  }, [messageReadData]);

  return (
    //subscripttion연결
    //newMessage올 경우. 그걸 authContext의 userInfo 갱신해준다.
    //방법 1 userInfo props 보내준다. 그러면 자동으로 리렌더링이 되니까
    //방법 2 userInfo context에서 관리. 근데 문제는 context는 리렌더링을 안 시켜준다.

    <NavigationContainer>
      <MainNavigation.Navigator headerMode="none">
        <MainNavigation.Screen name="Tab" children={() => <TabNavigation />} />
        <MainNavigation.Screen name="Room" component={Room} options={{headerShown: true, headerTitle: 'ddd'}} />
        <MainNavigation.Screen name="EditNickName" component={EditNickName} />
        <MainNavigation.Screen name="EditBirthDay" component={EditBirthDay} />
        <MainNavigation.Screen name="EditLocation" component={EditLocation} />
        <MainNavigation.Screen name="Accusation" component={Accusation} />
        <MainNavigation.Screen name="CreateRoom" component={CreateRoom} />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};
