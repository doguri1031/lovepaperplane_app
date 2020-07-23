import React, {useState, userInput, useRef} from 'react';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {ListItem, Input} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {DatePicker} from 'native-base';
import styled from 'styled-components';

export default ({navigation}) => {
  // const username = useInput('');
  // const nickname = useInput('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const [genderOverlay, setGenderOverlay] = useState(false);
  const [locationOverlay, setLocationOverlay] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const datePickerRef = useRef();

  return (
    <ScrollView>
      <View style={{marginTop: 0, width: '100%', alignSelf: 'center'}}>
        <ListItem
          // key={1}
          title={'User Name: '}
          leftIcon={<Icon5 name={'user'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={'#123123134'}
        />
        <ListItem
          onPress={() => navigation.navigate('EditNickName')}
          title={'NickName: '}
          leftIcon={<Icon5 name={'id-card'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={'Doguri'}
        />
        <ListItem
          // key={1}
          title={'Gender: '}
          leftIcon={<Icon5 name={'transgender'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={'Male'}
        />
        <ListItem
          title={'Location: '}
          leftIcon={<Icon5 name={'map-marker'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={'福岡'}
        />
        <ListItem
          onPress={() => navigation.navigate('EditBirthDay')}
          title={'Birth Day: '}
          leftIcon={<Icon5 name={'calendar'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={'1991/10/31'}
        />
      </View>
    </ScrollView>
  );
};
