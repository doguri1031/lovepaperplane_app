import React, {useState, userInput, useRef} from 'react';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {Input, Button, Header} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {DatePicker, Title} from 'native-base';
import styled from 'styled-components';
import moment from 'moment';
import {MODIFY_BIRTHDATE} from './EditQueries';
import {useUserInfo, useUserState, useSetRefresh} from '../../AuthContext';

export default ({navigation}) => {
  const datePickerRef = useRef();
  const userInfo = useUserInfo();
  const setUserState = useUserState();
  const setRefresh = useSetRefresh();
  const [birthDate, setBirthDate] = useState(userInfo.birthDate);
  const [modifyBirthDateMutation] = useMutation(MODIFY_BIRTHDATE);

  const changeBirthDate = async () => {
    const {
      data: {editUser},
    } = await modifyBirthDateMutation({
      variables: {
        data: birthDate,
        dataType: 'birthDate',
      },
    });
    console.log('edit result: ' + editUser);
    if (editUser) {
      userInfo.user.birthDate = editUser.birthDate;
      setRefresh(editUser.birthDate);
      setUserState(userInfo);
      navigation.navigate('EditProfile');
    }
  };

  return (
    <ScrollView>
      <Text style={{alignSelf: 'center', margin: 20}}>Edit Birth Day</Text>
      <Input
        value={birthDate}
        leftIcon={
          <Icon5
            onPress={() => datePickerRef.current.showDatePicker()}
            name={'calendar'}
            size={20}
            color="#b0c4de"
          />
        }></Input>
      <Button
        title="BirthDay Submit"
        onPress={() => changeBirthDate()}
        style={{margin: 30}}
      />
      <DatePicker
        ref={datePickerRef}
        defaultDate={new Date(2018, 4, 4)}
        minimumDate={new Date(2018, 1, 1)}
        maximumDate={new Date(2018, 12, 31)}
        locale={'jpn'}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={true}
        animationType={'fade'}
        androidMode={'default'}
        placeHolderText=" "
        textStyle={{color: 'transparent'}}
        placeHolderTextStyle={{color: '#d3d3d3'}}
        onDateChange={(e) =>
          setBirthDate(moment(e.toDateString()).format('YYYY/MM/DD'))
        }
        disabled={true}
      />
    </ScrollView>
  );
};
