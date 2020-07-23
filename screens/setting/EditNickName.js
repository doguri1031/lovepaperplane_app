import React, {useState, userInput, useRef} from 'react';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {DatePicker, Title} from 'native-base';
import styled from 'styled-components';

export default () => {
  return (
    <ScrollView>
      <Text style={{alignSelf: 'center', margin: 20}}>Edit NickName</Text>
      <Input></Input>
      <Button title="NickName Submit" style={{margin: 30}} />
    </ScrollView>
  );
};
