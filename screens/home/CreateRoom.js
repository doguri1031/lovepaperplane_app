import React, {useState, useEffect, useRef} from 'react';
import {Keyboard, Alert, TextInput} from 'react-native';
import {useMutation} from 'react-apollo-hooks';
import styled from 'styled-components';
import LocationSelector from '../../components/Overlay/LocationSelector';
import LottiedLoader from '../../components/LottieLoader';
import {Header, Left, Body, Right, Title, Radio, Container as NativeContainer} from 'native-base';
import {CREATEROOM} from './HomeQueries';
import useInput from '../../hooks/useInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoomsInfo, useSetRoomsInfo} from '../../AuthContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  height: 1500px;
  background: #3b3a36;
`;
const SelectLocation = styled.Text`
  font-weight: 700;
`;
const Content = styled.View`
  position: absolute;
  top: 130px;
  left: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5px;
  width: 100%;
  z-index: 1;
`;

const CountText = styled.Text`
  position: absolute;
  top: 27%;
  left: 74%;
  z-index: 2;
`;

const TextArea = styled.TextInput`
  position: relative;
  display: flex;
  border-radius: 2px;
  padding: 45px 20px 20px 20px;
  width: 85%;
  height: 20%;
  margin-top: 20px;
  box-shadow: 8px 8px 10px;
  background: #f9fcbd;
  align-self: center;
`;

const Triangle = styled.View`
  position: absolute;
  top: 400px;
  left: 352px;
  width: 0px;
  height: 0px;
  border-bottom-width: 32px;
  border-bottom-color: #141414;
  border-left-width: 32px;
  border-left-color: #faeb69;
`;
export default ({navigation, route}) => {
  const planeType = route.params?.planeType;
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const text = useInput('');
  const [createRoomMutation] = useMutation(CREATEROOM);
  const textRef = useRef();
  const roomsInfo = useRoomsInfo();
  const setRoomsInfo = useSetRoomsInfo();

  const validate = () => {
    if (location === '' || location === undefined) {
      Alert.alert('input location');
      return false;
    } else if (text.value === '') {
      Alert.alert('input textMessage');
      return false;
    }
    return true;
  };
  const onSubmit = async () => {
    if (!validate()) {
      return false;
    }
    setLoading(true);
    const {loading, data} = await createRoomMutation({
      variables: {planeType: planeType, data: text.value, location: location},
    });
    if (data) {
      const room = data.createRoom;
      let tempRoomsInfo = [...roomsInfo];
      tempRoomsInfo.push(room);
      setRoomsInfo(tempRoomsInfo);
      setLoading(false);
      navigation.navigate('Home');
    } else {
      Alert.alert('failed to send message');
    }
  };

  return (
    <>
      {loading ? (
        <LottiedLoader />
      ) : (
        <Container>
          <Header transparent>
            <Left>
              <Icon name="step-backward" size={24} color="white" onPress={() => navigation.navigate('Home')} />
            </Left>
            <Body>
              <Title>CREATE ROOM</Title>
            </Body>
            <Right>
              <FontAwesomeIcon name="paper-plane" size={24} color="white" onPress={onSubmit} />
            </Right>
          </Header>

          <Content>
            <SelectLocation>To</SelectLocation>
            <LocationSelector location={location} setLocation={setLocation} />
          </Content>
          <TextArea multiline={true} numberOfLines={30} autoFocus={true} {...text} ref={textRef} />
          <Triangle></Triangle>
          <CountText>0/300</CountText>
        </Container>
      )}
    </>
  );
};
