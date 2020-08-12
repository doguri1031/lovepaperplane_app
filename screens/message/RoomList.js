import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import Socket from './Socket';
import {AuthContext} from '../../AuthContext';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  return (
    <AuthContext.Consumer>
      {({messages}) => (
        <View>
          <Text>{messages}</Text>
        </View>
      )}
    </AuthContext.Consumer>
  );
};
