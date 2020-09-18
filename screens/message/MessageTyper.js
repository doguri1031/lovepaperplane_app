import React from 'react';
import {useMutation} from 'react-apollo-hooks';
import {SENDMESSAGE} from './MessageQueries';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import {Button} from '../../components/Buttons';
import {TextInput, TouchableOpacity, Alert, Platform} from 'react-native';
import {ActionSheet} from 'native-base';
import Icon from 'react-native-ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import constants from '../../constants';
import {APOLLO_URI} from '../../apolloClient';

const View = styled.View`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export default ({user, roomId, participant}) => {
  const text = useInput();
  const [newMessageMutation] = useMutation(SENDMESSAGE);
  const textValidate = () => {
    let textTrimmed = text.value.trim();
    if (textTrimmed === '') {
      return false;
    }
    return true;
  };
  const onSubmit = async () => {
    if (textValidate()) {
      const {loading, data} = await newMessageMutation({
        variables: {
          roomId: roomId,
          toId: participant[0].itsMe ? participant[1].id : participant[0].id,
          type: 'text',
          data: text.value,
        },
      });
      text.onChangeText('');
    }
  };

  return (
    <View>
      <TextInput type="text" {...text} style={{width: 330, marginHorizontal: 10}} placeholder="input your message" />

      <TouchableOpacity onPress={onSubmit}>
        <Icon name="paper-plane" size={30} color="#55efc4" />
      </TouchableOpacity>
    </View>
  );
};
