import React from 'react';
import styled from 'styled-components';
import constants from '../constants';

const View = styled.View`
  border: 1px solid transparent;
  width: ${constants.width / 2};
  display: flex;
  justify-content: center;
`;
const Block = styled.View`
  height: 19;
  border-radius: 10;
  width: ${(props) =>
    (constants.width * props.airplaneNumber) / (2 * props.maxNumber)};
  background-color: #55efc4;
`;
export default ({airplaneNumber, maxNumber}) => {
  console.log('statusBar');
  return (
    <View>
      <Block airplaneNumber={airplaneNumber} maxNumber={maxNumber} />
    </View>
  );
};
