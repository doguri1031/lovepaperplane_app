import React from 'react';
import styled from 'styled-components';
import {ActivityIndicator} from 'react-native';

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: 100px;
  margin-bottom: 25px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;
export const LoadingButton = ({
  text,
  onPress,
  loading = false,
  bgColor = null,
}) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={'white'} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

export const Button = ({text, onPress, bgColor = null}) => (
  <Touchable onPress={onPress}>
    <Container bgColor={bgColor}>
      <Text>{text}</Text>
    </Container>
  </Touchable>
);
