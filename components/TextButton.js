import React from 'react';
import styled from 'styled-components';
import constants from '../constants';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const View = styled.View`
  width: auto;
  height: auto;
  margin-left: 5%;
  margin-right: 5%;
`;

const TextButton = styled(Text)`
  color: ${(props) => (props.isClicked ? props.clickedColor : props.color)};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.fontWeight};
`;
export default ({size, color, clickedColor, fontWeight = 400, text, gender, value, setGender}) => {
  return (
    <TouchableOpacity onPress={() => setGender(value)}>
      <View>
        <TextButton size={size} color={color} clickedColor={clickedColor} isClicked={gender === value} fontWeight={fontWeight}>
          {text}
        </TextButton>
      </View>
    </TouchableOpacity>
  );
};
