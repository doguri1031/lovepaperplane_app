import React from 'react';
import styled from 'styled-components';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, Left, Body, Right, Title} from 'native-base';
import {useUserInfo} from '../../AuthContext';
import MessageTyper from './MessageTyper';
import constants from '../../constants';
const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageWrapper = styled.View`
  margin: 10px 5px;
  padding: 0px 8px;
  width: 100%;
`;
const MessageBox = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const SendMessageWapper = styled.View`
  display: flex;
  flex-direction: row-reverse;
  height: 20px;
  width: 100%;
`;
const ReceiveMesssageWrapper = styled.View`
  display: flex;
  height: 20px;
  width: 100%;
`;
const Message = styled.View`
  height: 20px;
  width: auto;
  border-radius: 5px;
  background-color: ${(props) => props.theme.darkGreyColor};
`;

export default ({navigation, route}) => {
  const roomId = route.params?.roomId;
  const userInfo = useUserInfo();
  const rooms = userInfo.rooms;

  const selectedRoom = rooms.filter((room) => {
    if (room.id === roomId) {
      return true;
    }
  });
  const room = selectedRoom[0];
  return (
    <>
      <Header>
        <Left>
          <Icon
            name="step-backward"
            size={24}
            color="white"
            onPress={() => navigation.navigate('RoomList')}
          />
        </Left>
        <Body>
          <Title>
            {room.participant[0].itsMe
              ? room.participant[1].nickname
              : room.participant[0].nickname}
          </Title>
        </Body>
        <Right />
      </Header>
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{backgroundColor: '#81ecec'}}
            contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {room.messages.map((message) => (
              <MessageWrapper key={message.id}>
                {message.from.itsMe ? (
                  <SendMessageWapper>
                    <Message>
                      <Text>{message.data}</Text>
                    </Message>
                  </SendMessageWapper>
                ) : (
                  <ReceiveMesssageWrapper>
                    <Message>
                      <Text>{message.data}</Text>
                    </Message>
                  </ReceiveMesssageWrapper>
                )}
              </MessageWrapper>
            ))}
          </ScrollView>
        </TouchableWithoutFeedback>
        <MessageTyper roomId={room.id} participant={room.participant} />
      </Container>
    </>
  );
};
