import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import styled, {keyframes} from 'styled-components';
const Container = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;
const BackCircle = styled(View)`
  position: absolute;
  border-radius: 50;
  border: 3px solid black;
  background-color: red;
  opacity: 0.2;
`;

const LottieContainer = styled(View)`
  width: 250px;
  height: 250px;
`;

export default () => {
  return (
    <LottieContainer>
      <BackCircle />
      <LottieView source={require('../lottie/message-received.json')} autoPlay loop />
    </LottieContainer>
  );
};
