import React, {useState, useEffect, useRef} from 'react';
import {Keyboard, Alert, TextInput} from 'react-native';
import {useMutation} from 'react-apollo-hooks';
import styled from 'styled-components';
import {Button} from '../../components/Buttons';
import LocationSelector from '../../components/Overlay/LocationSelector';
import LottiedLoader from '../../components/LottieLoader';
import {
  Header,
  Left,
  Body,
  Right,
  Title,
  Radio,
  Container as NativeContainer,
} from 'native-base';
import {CREATEROOM} from './HomeQueries';
import useInput from '../../hooks/useInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements';

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;
const Text = styled.Text`
  margin-left: 10px;
  font-weight: 700;
`;
const Content = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: 100%;
`;

export default ({navigation}) => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const text = useInput('');
  const [createRoomMutation] = useMutation(CREATEROOM);
  const textRef = useRef();

  const validate = () => {
    if (location === '' || location === undefined) {
      Alert.alert('input location');
      Alert.alert(location);
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
      variables: {data: text.value, location: location},
    });
    setTimeout(() => setLoading(false), 5000);
    if (data) {
      navigation.navigate('roomList');
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
          <Header>
            <Left>
              <Icon
                name="step-backward"
                size={24}
                color="white"
                onPress={() => navigation.navigate('Home')}
              />
            </Left>
            <Body>
              <Title>CREATE ROOM</Title>
            </Body>
            <Right></Right>
          </Header>

          <Content>
            <Radio
              color={'#f0ad4e'}
              selectedColor={'#5cb85c'}
              selected={false}
            />
            <Text>location</Text>
            <LocationSelector location={location} setLocation={setLocation} />
          </Content>
          <TextInput
            style={{heigth: 150, textAlignVertical: 'top'}}
            multiline={true}
            numberOfLines={30}
            autoFocus={true}
            {...text}
            placeholder="Textarea"
            ref={textRef}
          />
        </Container>
      )}
    </>
  );
};
