import React from 'react';
import {Text, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {useQuery} from 'react-apollo-hooks';
import {LOGIN} from './AuthQueries';
import {useLogUserIn} from '../../AuthContext';
import constants from '../../constants';
import styled from 'styled-components';
import {Button} from '../../components/Buttons';
const View = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const LottieContainer = styled.View`
  width: 250px;
  height: 250px;
`;

export default ({navigation}) => {
  const logUserIn = useLogUserIn();
  const {data, loading, refetch} = useQuery(LOGIN, {
    variables: {machineId: constants.machineId},
  });
  const onLoginPress = async () => {
    await refetch();
    if (!loading && data) {
      console.log('login');
      console.log('tokenId: ' + data.login);
      logUserIn(data.login);
    } else {
      Alert.alert("you don't have account");
    }
  };
  return (
    <View>
      <LottieContainer>
        <LottieView source={require('../../lottie/message-received.json')} autoPlay loop />
      </LottieContainer>
      <Text>Main</Text>
      <Button text="login" onPress={onLoginPress} />
      <Button text="sign up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};
