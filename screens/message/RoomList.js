import React, {Component} from 'react';
import {Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import {useQuery} from 'react-apollo-hooks';
import {SEARCH_ROOMLIST} from './RoomsQueries';
import {useRoomsInfo, useUserInfo} from '../../AuthContext';
import {View, TouchableOpacity, Alert} from 'react-native';
import MessageTyper from './MessageTyper';
import styled from 'styled-components';

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
                <Text>{room.participant[0].id === userInfo.id ? room.participant[1].nickname : room.participant[0].nickname}</Text>
                <Text note>{room.messages[room.messages.length - 1].data}</Text>
              </Body>
              <Right>
                <Text note>{room.messages.updatedAt}</Text>
              </Right>
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
