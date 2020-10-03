import React, {Component} from 'react';
import {Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View as NView} from 'native-base';
import {Badge} from '../../components/Badge';
import {useQuery} from 'react-apollo-hooks';
import {useRoomsInfo, useUserInfo} from '../../AuthContext';
import {TouchableOpacity, Alert} from 'react-native';
import MessageTyper from './MessageTyper';
import styled from 'styled-components';
import {dateTransformer} from '../../utils';

export default ({navigation}) => {
  const userInfo = useUserInfo();
  const roomsInfo = useRoomsInfo();
  const NotList = styled.View`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  `;

  return (
    <Container>
      <Header />
      <List>
        {roomsInfo.length ? (
          roomsInfo.map((room) => (
            <ListItem key={room.id} avatar onPress={() => navigation.navigate('Room', {roomId: room.id})}>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
              </Left>
              <Body>
                <Left style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <NView>
                    <Text>{room.participant[0].id === userInfo.id ? room.participant[1].nickname : room.participant[0].nickname}</Text>
                    <Text note>{room.messages[room.messages.length - 1].data}</Text>
                  </NView>
                  <NView style={{marginRight: 10}}>
                    <Text note style={{marginRight: 5}}>
                      {dateTransformer(room.messages[room.messages.length - 1].createdAt)}
                    </Text>
                    <NumberBadge userId={userInfo.id} room={room} />
                  </NView>
                </Left>
              </Body>
            </ListItem>
          ))
        ) : (
          <NotList>
            <Text>チャットが存在しません。</Text>
          </NotList>
        )}
      </List>
    </Container>
  );
};

const NumberBadge = ({userId, room}) => {
  let myReadFlg;
  console.log();
  room.readFlg[0].fromId === userId ? (myReadFlg = room.readFlg[0]) : (myReadFlg = room.readFlg[1]);
  let unReadMsgNumber = 0;
  for (var i = room.messages.length - 1; i >= 0; i--) {
    if (room.messages[i].createdAt < myReadFlg.checkedTime) {
      break;
    }
    unReadMsgNumber++;
  }
  console.log('unReadMsg :' + unReadMsgNumber);
  if (unReadMsgNumber === 0) {
    return <></>;
  } else if (0 < unReadMsgNumber && unReadMsgNumber <= 99) {
    return <Badge text={unReadMsgNumber} size={'medium'} top={22} left={10} />;
  } else if (99 < unReadMsgNumber) {
    return <Badge text={'99+'} size={'medium'} top={22} left={10} />;
  }
};
