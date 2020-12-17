import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Header, Content, Button, Toast, Root} from 'native-base';
import {Text, TouchableWithoutFeedback, Keyboard, TextInput as NativeTextInput} from 'react-native';
import useInput from '../../hooks/useInput';
import Ionicon from 'react-native-ionicons';
import {useMutation} from 'react-apollo-hooks';
import {SECRETCONFIRM} from './AuthQueries';
import {useLogUserIn} from '../../AuthContext';

const View = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3b3a36;
  flex: 1;
`;
const Container = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-color: rgba(126, 214, 223, 1);
  border-bottom-width: 1px;
  background-color: 'rgba(0,0,0,0)';
  margin-top: 3%;
  width: 50%;
  height: 7%;
  justify-content: space-between;
  align-items: center;
`;
const TextInput = styled(NativeTextInput)`
  font-size: 20px;
  color: white;
  ::placeholder {
    color: white;
  }
`;
const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`;
const Block = styled.View``;
export default ({navigation, route}) => {
  const secret = useInput();
  const logUserIn = useLogUserIn();
  const [secretConfirmMutation] = useMutation(SECRETCONFIRM);
  const placeholderTextColor = 'rgba(236, 240, 241,1.0)';
  const showToast = (result) => {
    console.log('toast');

    //success,danger
    let type = 'danger';
    let text = 'secret is not correct';
    if (result) {
      type = 'success';
      text = 'secret is correct';
    }
    Toast.show({
      text,
      buttonText: 'Okay',
      duration: 3000,
      type,
    });
  };
  const onSubmit = async () => {
    const {loading, data} = await secretConfirmMutation({variables: {username: route.params.username, secret: secret.value}});
    console.log('result : ' + data.secretConfirm);
    if (data.secretConfirm === 'false') {
      //confirm 으로 이동
      showToast();
    } else {
      //로그인 처리
      logUserIn(data.secretConfirm);
    }
  };
  return (
    <Root>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Ionicon name="lock" size={80} color={placeholderTextColor} />
          <Text style={{color: placeholderTextColor, fontWeight: '700', fontSize: 30}}>Authentication</Text>
          <Block style={{height: '4%'}} />
          <Container>
            <TextInput placeholder={'input your secret'} placeholderTextColor={placeholderTextColor} {...secret} />
          </Container>
          <Block style={{height: '9%'}} />
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '50%', height: '6%', backgroundColor: 'rgba(126, 214, 223,1.0)'}}
            onPress={() => {
              onSubmit();
            }}>
            <Text style={{color: placeholderTextColor, backgroundColor: 'transparent'}}>Submit</Text>
          </TouchableOpacity>
          <Block style={{height: '3%'}} />
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '50%', height: '6%', backgroundColor: 'rgba(126, 214, 223,1.0)'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: placeholderTextColor, backgroundColor: 'transparent'}}>Back</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Root>
  );
};
