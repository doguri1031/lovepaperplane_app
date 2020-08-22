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
  justify-content: center;
  align-items: center;
`;

export default () => {
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
          roomId: 'ckdlx45en6eyz0999lcudlk7o',
          toId: 'ckclwwp37wja80975wpqu2h75',
          type: 'text',
          data: text.value,
        },
      });
      text.onChangeText('');
    }
  };
  return (
    <View>
      <TextInput
        style={{
          width: constants.width / 1.2,
          borderBottomWidth: 0.5,
          borderBottomStyle: 'solid',
        }}
        type="text"
        {...text}
        placeholder="input your message"
      />

      <TouchableOpacity onPress={onPress}>
        <Icon name="paper-plane" size={30} color="#55efc4" />
      </TouchableOpacity>
    </View>
  );
};
