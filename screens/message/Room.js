import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Text, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Header, Left, Body, Right, Button, Title, Root, Text as BaseText} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Overlay} from 'react-native-elements';
import {useRoomsInfo, useUserInfo} from '../../AuthContext';
import MessageTyper from './MessageTyper';
import constants from '../../constants';
import useInput from '../../hooks/useInput';
import {useMutation} from 'react-apollo-hooks';
import {COMPLAIN, READMESSAGE} from './MessageQueries';
import {EXIT_ROOM} from './ExitRoomQueries';
import Dialog from 'react-native-dialog';

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
const ExitMesssageWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
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
const ReadFlg = styled.View`
  color: ${(props) => props.theme.lightGreyColor};
  font-size: 12px;
  padding-right: 5px;
`;
const PopupContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  border-radius: 10px;
`;

export default ({navigation, route}) => {
  const roomId = route.params?.roomId;
  const user = useUserInfo();
  const rooms = useRoomsInfo();
  const repoReasonText = useInput();
  const [repoCategory, setRepoCategory] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedMessage, setSeletedMessage] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [complainMutation] = useMutation(COMPLAIN);
  const [exitRoomsMutation] = useMutation(EXIT_ROOM);
  const [readMessageMutation] = useMutation(READMESSAGE);

  const selectedRoom = rooms.filter((room) => {
    if (room.id === roomId) {
      return true;
    }
  });
  const onComplain = async () => {
    if (repoCategory === undefined) {
      Alert.alert('カテゴリをご入力ください。');
      return;
    }
    const complain = await complainMutation({
      variables: {
        blockFlgId: myBlockFlg.id,
        messageId: selectedMessage.id,
        toId: selectedMessage.from.id,
        category: repoCategory,
        comment: repoReasonText.value,
      },
    });
    console.log(complain);
    Alert.alert('complain');
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const room = selectedRoom[0];

  let yourBlockFlg;
  const myBlockFlgList = room.blockFlg.filter((flg) => {
    if (flg.fromId === user.id) {
      return true;
    } else {
      yourBlockFlg = flg;
    }
  });
  const myBlockFlg = myBlockFlgList[0];
  console.log('yourBlockFlg :' + yourBlockFlg.flag);

  const handleExit = async () => {
    const {
      data: {exitRoom},
    } = await exitRoomsMutation({
      variables: {
        userId: user.id,
        roomId: room.id,
        blockId: myBlockFlg.id,
        toId: room.participant[0].itsMe ? room.participant[1].id : room.participant[0].id,
      },
    });
    if (exitRoom) {
      console.log('success exit room');
      navigation.navigate('RoomList');
    } else {
      console.log('err man');
    }
  };
  const readingMessage = async () => {
    let unreadMessageIdList = [];
    //제일 마지막 메세지부터, 기독 or 내 메세지인지 확인하고 맞으면 for문 break;
    for (var i = room.messages.length - 1; i >= 0; i--) {
      if (room.messages[i].itsMe || room.messages[i].isChecked) {
        break;
      }
      unreadMessageIdList.push(room.messages[i].id);
    }
    if (unreadMessageIdList.length > 0) {
      console.log('ddd222');
      console.log(unreadMessageIdList);
      const {
        data: {readMessage},
      } = await readMessageMutation({variables: {unreadMessageIdList: unreadMessageIdList}});
    }
  };

  //메세지 기독 체크
  useEffect(() => {
    console.log('ddd');
    readingMessage();
  }, []);

  return (
    <Root>
      <Header>
        <Left>
          <FontAwesomeIcon name="step-backward" size={24} color="white" onPress={() => navigation.navigate('RoomList')} />
        </Left>
        <Body>
          <Title>{room.participant[0].itsMe ? room.participant[1].nickname : room.participant[0].nickname}</Title>
          <BaseText
            style={{
              color: 'white',
              fontSize: 12,
            }}>
            {room.participant[0].itsMe ? room.participant[1].location : room.participant[0].location}
          </BaseText>
        </Body>
        <Right />
        <Right>
          <Button transparent onPress={() => showDialog()}>
            <EntypoIcon name="log-out" size={24} />
          </Button>
        </Right>
      </Header>
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{backgroundColor: '#81ecec'}}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
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
                    <ReadFlg>
                      <Text>{'기독'}</Text>
                    </ReadFlg>
                    <TouchableOpacity
                      onLongPress={() => {
                        setSeletedMessage(message);
                        setOverlayVisible(true);
                      }}>
                      <Message>
                        <Text
                          style={{
                            maxWidth: constants.width / 2.5,
                            fontSize: 18,
                          }}>
                          {message.data}
                        </Text>
                      </Message>
                    </TouchableOpacity>
                  </ReceiveMesssageWrapper>
                )}
              </MessageWrapper>
            ))}
            {yourBlockFlg.flag && (
              <ExitMesssageWrapper>
                <Message>
                  <Text
                    style={{
                      maxWidth: constants.width / 2.5,
                      fontSize: 18,
                    }}>
                    {'상대방이 채팅방을 나갔습니다.'}
                  </Text>
                </Message>
              </ExitMesssageWrapper>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
        <MessageTyper user={user} roomId={room.id} participant={room.participant} />
      </Container>
      <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
        <PopupContainer>
          <Text>신고하기</Text>
          <DropDownPicker
            items={[
              {
                label: 'UK',
                value: 'uk',
                icon: () => <FeatherIcon name="flag" size={18} color="#900" />,
              },
              {
                label: 'France',
                value: 'france',
                icon: () => <FeatherIcon name="flag" size={18} color="#900" />,
              },
            ]}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            defaultValue={repoCategory}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => setRepoCategory(item.value)}
          />
          <TextInput
            style={{
              height: 50,
              textAlignVertical: 'top',
            }}
            multiline={true}
            numberOfLines={5}
            {...repoReasonText}
            placeholder="Textarea"
          />
          <Button title="submit" onPress={onComplain} />
        </PopupContainer>
      </Overlay>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Description>チャットから退出しますか</Dialog.Description>
        <Dialog.Button label="退出" onPress={handleExit} />
        <Dialog.Button color="red" label="キャンセール" onPress={handleCancel} />
      </Dialog.Container>
    </Root>
  );
};
