import React from 'react';
import styled from 'styled-components';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Header,
  Left,
  Body,
  Right,
  Title,
  Root,
  Text as BaseText,
} from 'native-base';
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
  height: auto;
  width: 100%;
`;
const ReceiveMesssageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
`;
const Message = styled.View`
  display: flex;
  justify-content: center;
  padding: 10px 10px;
  height: auto;
  width: auto;
  max-width: ${constants.width / 2.5}px;
  border-radius: 18px;

  background-color: ${(props) => props.theme.lightGreyColor};
`;

export default ({navigation, route}) => {
  const roomId = route.params?.roomId;
  const userInfo = useUserInfo();
  const rooms = userInfo.rooms;
  const user = userInfo.user;
  const selectedRoom = rooms.filter((room) => {
    if (room.id === roomId) {
      return true;
    }
  });
  const room = selectedRoom[0];
  return (
    <Root>
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
          <BaseText style={{color: 'white', fontSize: 12}}>
            {room.participant[0].itsMe
              ? room.participant[1].location
              : room.participant[0].location}
          </BaseText>
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
                      <Text
                        style={{
                          maxWidth: constants.width / 2.5,
                          fontSize: 18,
                        }}>
                        {message.data}
                      </Text>
                    </Message>
                  </SendMessageWapper>
                ) : (
                  <ReceiveMesssageWrapper>
                    <Message>
                      <Text
                        style={{
                          maxWidth: constants.width / 2.5,
                          fontSize: 18,
                        }}>
                        {message.data}
                      </Text>
                    </Message>
                  </ReceiveMesssageWrapper>
                )}
              </MessageWrapper>
            ))}
          </ScrollView>
        </TouchableWithoutFeedback>
        <MessageTyper
          user={user}
          roomId={room.id}
          participant={room.participant}
        />
      </Container>
    </Root>
  );
};
