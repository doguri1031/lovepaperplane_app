import React, {useState, useRef, useEffect} from 'react';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {DatePicker, Title} from 'native-base';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {useUserInfo} from '../../AuthContext';
import {MODIFY_NICKNAME} from './EditQueries';

export default () => {
  const [modifyNickNameMutation] = useMutation(MODIFY_NICKNAME);

  const userInfo = useUserInfo();
  const nickname = useInput(userInfo.nickname);

  const changeNickName = async () => {
    const {data: editUser} = await modifyNickNameMutation({
      variables: {
        data: nickname.value,
        dataType: 'nickname',
      },
    });
    console.log('edit result: ' + editUser);
  };

  return (
    <ScrollView>
      <Text style={{alignSelf: 'center', margin: 20}}>Edit NickName</Text>
      <Input {...nickname} name="nickname"></Input>
      <Button
        title="NickName Submit"
        onPress={() => changeNickName()}
        style={{margin: 30}}
      />
    </ScrollView>
  );
};
