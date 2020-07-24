import React, {useState} from 'react';
import {TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useMutation} from 'react-apollo-hooks';
import styled from 'styled-components';
import {Button} from '../../components/Buttons';
import LocationSelector from '../../components/Overlay/LocationSelector';
import LottiedLoader from '../../components/LottieLoader';
import {Textarea} from 'native-base';
import {CREATEROOM} from './HomeQueries';
import useInput from '../../hooks/useInput';

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {loading ? (
        <LottiedLoader />
      ) : (
        <Container>
          <Content>
            <Text>createRoom</Text>
          </Content>
          <Content>
            <Text>location</Text>
            <LocationSelector location={location} setLocation={setLocation} />
          </Content>
          <Textarea rowSpan={5} {...text} bordered placeholder="Textarea" />
          <Content>
            <Button text={'submit'} onPress={onSubmit} />
          </Content>
        </Container>
      )}
    </TouchableWithoutFeedback>
  );
};
