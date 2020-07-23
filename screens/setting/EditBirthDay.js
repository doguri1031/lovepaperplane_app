import React, {useState, userInput, useRef} from 'react';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {Input, Button, Header} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {DatePicker, Title} from 'native-base';
import styled from 'styled-components';
import moment from 'moment';

export default () => {
  const datePickerRef = useRef();
  const [birthDate, setBirthDate] = useState('1991/10/31');

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
      <Button title="BirthDay Submit" style={{margin: 30}} />
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
        textStyle={{color: '#F5F5F5'}}
        placeHolderTextStyle={{color: '#d3d3d3'}}
        onDateChange={(e) =>
          setBirthDate(moment(e.toDateString()).format('YYYY年MM月DD日'))
        }
        disabled={true}
      />
    </ScrollView>
  );
};
