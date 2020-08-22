import React from 'react';
import {useMutation} from 'react-apollo-hooks';
import {SENDMESSAGE} from './MessageQueries';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {Button} from '../../components/Buttons';
const View = styled.View`
  display: flex;
`;
const TextInput = styled.input``;
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
  const onPress = () => {
    if (textValidate()) {
      const {loading, data} = newMessageMutation({
        variables: {
          roomId: 'ckdlx45en6eyz0999lcudlk7o',
          toId: 'ckclwwp37wja80975wpqu2h75',
          type: 'text',
          data: text.value,
        },
      });
    }
  };
  return (
    <View>
      <TextInput type="text" {...text} />
      <Button text="submit" onPress={onPress} />
    </View>
  );
};
