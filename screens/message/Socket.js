import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSubscription} from 'react-apollo-hooks';
import {NEWMESSAGE} from './MessageQueries';
import {useUserInfo, useSetMsg, AuthContext} from '../../AuthContext';

const Text = styled.Text``;
const View = styled.View``;
export default () => {
  const {msg} = useSetMsg();

  return (
    <AuthContext.Consumer>
      <View>
        <Text>{msg}</Text>
      </View>
    </AuthContext.Consumer>
  );
};
