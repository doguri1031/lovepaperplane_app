import React from 'react';
import styled from 'styled-components';
import {Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useUserInfo} from '../../AuthContext';
import MessageTyper from './MessageTyper';
const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 30px;
  flex: 0.88;
`;
const MessageWrapper = styled.View`
  margin-top: 10px;
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
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MessageBox>
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
        </MessageBox>
      </TouchableWithoutFeedback>
      <MessageTyper roomId={room.id} participant={room.participant} />
    </Container>
  );
};
