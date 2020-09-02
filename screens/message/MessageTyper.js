import React from 'react';
import {useMutation} from 'react-apollo-hooks';
import {SENDMESSAGE} from './MessageQueries';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {Button} from '../../components/Buttons';
import {TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';
import constants from '../../constants';

const View = styled.View`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export default ({roomId, participant}) => {
  const text = useInput();
  const [newMessageMutation] = useMutation(SENDMESSAGE);
  const textValidate = () => {
    let textTrimmed = text.value.trim();
    if (textTrimmed === '') {
      return false;
    }
    return true;
  };
  const onPress = async () => {
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
      <TextInput type="text" {...text} placeholder="input your message" />

      <TouchableOpacity onPress={onPress}>
        <Icon name="paper-plane" size={30} color="#55efc4" />
      </TouchableOpacity>
    </View>
  );
};
