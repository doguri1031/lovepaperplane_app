import React, {Component} from 'react';
import {Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import {useQuery} from 'react-apollo-hooks';
import {SEARCH_ROOMLIST} from './RoomsQueries';
import {useRoomsInfo, useUserInfo} from '../../AuthContext';
import {View, TouchableOpacity, Alert} from 'react-native';
import MessageTyper from './MessageTyper';

export default ({navigation}) => {
  const userInfo = useUserInfo();
  const roomsInfo = useRoomsInfo();
  console.log('userInfo test : ' + roomsInfo[0].participant[0].nickname + '  ,' + roomsInfo[0].participant[1].nickname);
  console.log('userInfo test : ' + roomsInfo[1].participant[0].nickname + '  ,' + roomsInfo[1].participant[1].nickname);
  console.log('userInfo test : ' + roomsInfo[2].participant[0].nickname + '  ,' + roomsInfo[2].participant[1].nickname);
  console.log(roomsInfo);

  return (
    <Container>
      <Header />
      <List>
        {roomsInfo.map((room) => (
          <ListItem key={room.id} avatar onPress={() => navigation.navigate('Room', {roomId: room.id})}>
            <Left>
              <Thumbnail source={{uri: 'Image URL'}} />
            </Left>
            <Body>
              <Text>{room.participant[0].id === userInfo.id ? room.participant[1].nickname : room.participant[0].nickname}</Text>
              <Text note>{room.messages[room.messages.length - 1].data}</Text>
            </Body>
            <Right>
              <Text note>{room.messages.updatedAt}</Text>
            </Right>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
