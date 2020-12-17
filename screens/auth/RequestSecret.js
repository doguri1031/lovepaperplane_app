import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Header, Content, Button, Toast, Root} from 'native-base';
import {Text, TouchableWithoutFeedback, Keyboard, TextInput as NativeTextInput} from 'react-native';
import useInput from '../../hooks/useInput';
import Ionicon from 'react-native-ionicons';
import {useMutation} from 'react-apollo-hooks';
import {REQUESTSECRET} from './AuthQueries';

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
export default ({navigation}) => {
  const username = useInput();
  const placeholderTextColor = 'rgba(236, 240, 241,1.0)';
  const [requestSecretMutation] = useMutation(REQUESTSECRET);
  const showToast = () => {
    console.log('toast');
    //success,danger
    let type = 'danger';
    let text = "account doesn't exist";

    Toast.show({
      text,
      buttonText: 'Okay',
      duration: 3000,
      type,
    });
  };
  const onSubmit = async () => {
    const {loading, data} = await requestSecretMutation({variables: {username: username.value}});
    console.log('result : ' + data.requestSecret);
    if (data.requestSecret) {
      //confirm 으로 이동
      navigation.navigate('SecretConfirm', {username: username.value});
    } else {
      showToast();
    }
  };
  return (
    <Root>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Ionicon name="mail" size={80} color={placeholderTextColor} />
          <Text style={{color: placeholderTextColor, fontWeight: '700', fontSize: 30}}>Login</Text>
          <Block style={{height: '4%'}} />
          <Container>
            <TextInput placeholder={'E-mail'} placeholderTextColor={placeholderTextColor} {...username} />
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
