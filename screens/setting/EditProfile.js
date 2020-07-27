import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {ListItem, Input} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {DatePicker} from 'native-base';
import styled from 'styled-components';
import {useUserInfo} from '../../AuthContext';

export default ({navigation}) => {
  let userInfo = useUserInfo();

  return (
    <ScrollView>
      <View style={{marginTop: 0, width: '100%', alignSelf: 'center'}}>
        <ListItem
          // key={1}
          title={'User Name: '}
          leftIcon={<Icon5 name={'user'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={userInfo.username}
        />
        <ListItem
          onPress={() => navigation.navigate('EditNickName')}
          title={'NickName: '}
          leftIcon={<Icon5 name={'id-card'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={userInfo.nickname}
        />
        <ListItem
          // key={1}
          title={'Gender: '}
          leftIcon={<Icon5 name={'transgender'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={userInfo.gender}
        />
        <ListItem
          onPress={() => navigation.navigate('EditLocation')}
          title={'Location: '}
          leftIcon={<Icon5 name={'map-marker'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={userInfo.location}
        />
        <ListItem
          onPress={() => navigation.navigate('EditBirthDay')}
          title={'Birth Day: '}
          leftIcon={<Icon5 name={'calendar'} size={20} color="#b0c4de" />}
          bottomDivider
          titleStyle={{color: '#aaa'}}
          rightTitle={userInfo.birthDate}
        />
      </View>
    </ScrollView>
  );
};
