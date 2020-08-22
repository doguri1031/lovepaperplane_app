import React from 'react';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {
  useUserInfo,
  useSetLoading,
  useSetUserInfo,
  AuthContext,
} from '../../AuthContext';
import {MODIFY_NICKNAME} from './EditQueries';

export default ({navigation}) => {
  const [modifyNickNameMutation] = useMutation(MODIFY_NICKNAME);
  const userInfo = useUserInfo();
  const setUserInfo = useSetUserInfo();
  const nickname = useInput(userInfo.user.nickname);
  const changeNickName = async () => {
    const {
      data: {editUser},
    } = await modifyNickNameMutation({
      variables: {
        data: nickname.value,
        dataType: 'nickname',
      },
    });
    if (editUser) {
      let tempUser = userInfo;
      tempUser.user.nickname = editUser.nickname;
      setUserInfo({...tempUser});
      navigation.navigate('EditProfile');
    }
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
