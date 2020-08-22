import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {useQuery} from 'react-apollo-hooks';
import {SEARCH_ROOMLIST} from './RoomsQueries';
import {useUserInfo} from '../../AuthContext';
import {View} from 'react-native';
import MessageTyper from './MessageTyper';
export default ({navigation}) => {
  const userInfo = useUserInfo();
  console.log('userInfo test : ' + userInfo.rooms[0].id);
  const roomsInfo = userInfo.rooms;
  console.log(roomsInfo);
  return (
    <View>
      <MessageTyper />
    </View>
  );
  /*return (
    <Container>
      <Header />
      <List>
        {roomsInfo.map((l, i) => (
          <ListItem avatar>
            <Left>
              <Thumbnail source={{uri: 'Image URL'}} />
            </Left>
            <Body>
              <Text>
                {l.participant[0].id === userInfo.user.id
                  ? l.participant[1].nickname
                  : l.participant[0].nickname}
              </Text>
              <Text note>자니...?</Text>
            </Body>
            <Right>
              <Text note>{l.messages.updatedAt}</Text>
            </Right>
          </ListItem>
        ))}
      </List>
    </Container>
  );*/
};
