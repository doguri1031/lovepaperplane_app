import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import styled from 'styled-components';
const LottieContainer = styled(View)`
  width: 250px;
  height: 250px;
`;

export default () => {
  return (
    <LottieContainer>
      <LottieView
        source={require('../lottie/message-received.json')}
        autoPlay
        loop
      />
    </LottieContainer>
  );
};
