import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const Box = styled.View`
  background-color: ${(props) => props.color};
  border-radius: ${(props) => (props.size === 'small' ? 10 : props.size === 'medium' ? 15 : 20)};
  width: ${(props) => (props.size === 'small' ? 20 : props.size === 'medium' ? 25 : 40)};
  height: ${(props) => (props.size === 'small' ? 20 : props.size === 'medium' ? 25 : 40)};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  font-weight: ${(props) => (props.size === 'small' ? 500 : props.size === 'medium' ? 600 : 700)};
`;

export const Badge = ({size = 'small', text, color = 'red', top = 0, left = 0}) => {
  let textSize = 0;
  if (size === 'small') {
    textSize = 11;
  } else if (size === 'medium') {
    textSize = 13;
  } else if (size === 'large') {
    textSize = 18;
  }
  return (
    <Box size={size} color={color} top={top} left={left}>
      <Text style={{color: 'white', fontSize: textSize}}>{text}</Text>
    </Box>
  );
};
