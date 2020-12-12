import React, {useState, useRef, useEffect} from 'react';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {CREATE_USER} from './AuthQueries';
import {Text, TouchableWithoutFeedback, Keyboard, TextInput as NativeTextInput} from 'react-native';
import constants from '../../constants';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {Input} from 'react-native-elements';
import {Overlay} from 'react-native-elements';
import GenderOverlay from '../../components/Overlay/GenderOverlay';
import LocationOverlay from '../../components/Overlay/LocationOverlay';
import {DatePicker} from 'native-base';
import {useLogUserIn} from '../../AuthContext';
import Ionicon from 'react-native-ionicons';
import LocationSelectModal from '../../components/LocationSelectModal';
import TextButton from '../../components/TextButton';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-color: rgba(126, 214, 223, 1);
  border-bottom-width: 1px;
  background-color: 'rgba(0,0,0,0)';
  margin-top: 3%;
  width: 70%;
  height: 7%;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.View`
  display: flex;
  background-color: blue;
  justify-content: center;
  align-items: center;
  background-color: 'rgba(0,0,0,0)';
  height: auto;
  align-items: center;
`;
const TextInput = styled(NativeTextInput)`
  font-size: 20px;
  color: white;
  ::placeholder {
    color: white;
  }
`;

const View = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3b3a36;
  flex: 1;
`;
const Block = styled.View``;
const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`;
export default ({navigation}) => {
  const username = useInput('');
  const nickname = useInput('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [genderOverlay, setGenderOverlay] = useState(false);
  const [locationOverlay, setLocationOverlay] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const logUserIn = useLogUserIn();
  const datePickerRef = useRef();
  /*const {data, loading, refetch} = useQuery(CHECK_USERNAME, {
    variables: {username: username.value},
    skip: username.value === '',
  });*/
  const [createUserMutation] = useMutation(CREATE_USER, {
    variables: {
      username: username.value,
      nickname: nickname.value,
      gender: gender,
      location: location,
      birthDate: birthDate,
      machineId: constants.machineId,
    },
  });
  const placeholderTextColor = 'rgba(236, 240, 241,1.0)';
  const iconColor = 'rgba(126, 214, 223, 1)';
  const backgroundColor = '#3b3a36';
  const date = new Date();
  console.log(1);
  const onPressSignUp = () => {
    console.log();
  };
  const nicknameValidator = () => {};
  const validate = () => {
    setIsSubmitClicked(true);
    if (!usernameValid) {
      return false;
    } else if (nickname.value === '') {
      return false;
    } else if (location === '') {
      return false;
    } else if (birthDate === '') {
      return false;
    } else if (gender === '') {
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (validate()) {
      const {data: createUser} = await createUserMutation();
      console.log('result:' + createUser.createUser);
      if (createUser.createUser) {
        navigation.navigate('SecretCheck', {username: username});
      } else {
      }
      //logUserIn(createUser.createUser);
      console.log('ddd');
    }
  };
  useEffect(() => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    var result = regExp.test(username.value);
    if (result) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
  }, [username]);
  /*
  useEffect(() => {
    if (data !== undefined) {
      if (data.checkUsername) {
        setUsernameError({
          errorMessage: 'available',
          errorStyle: {color: 'green'},
        });
      } else {
        setUsernameError({
          errorMessage: 'duplicated',
          errorStyle: {color: 'red'},
        });
      }
    }
  }, [data]);
  */

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Ionicon name="people" size={80} color={placeholderTextColor} />
        <Text style={{color: placeholderTextColor, fontWeight: '700', fontSize: 30}}>SignUp</Text>
        <Block style={{height: '4%'}} />
        <Container>
          <Ionicon name="person" size={20} color={iconColor} style={{}} />
          <TextInput placeholder={'E-MAIL'} {...username} placeholderTextColor={placeholderTextColor} style={{width: '85%'}} />
          {username.value !== '' && usernameValid && <Icon5 name={'check'} size={15} color="#9de500" style={{marginLeft: -20}} />}
        </Container>
        <Container>
          <Ionicon name="happy" size={20} color={iconColor} style={{paddingRight: '5%'}} />
          <TextInput placeholder={'NICKNAME'} {...nickname} placeholderTextColor={placeholderTextColor} style={{width: '85%'}} />
          {nickname.value === '' ? <Icon5 name={'check'} size={15} color={backgroundColor} style={{marginLeft: -20}} /> : <Icon5 name={'check'} size={15} color="#9de500" style={{marginLeft: -20}} />}
        </Container>
        <Container>
          <TouchableOpacity onPress={() => datePickerRef.current.showDatePicker()} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Ionicon name="calendar" size={20} color={iconColor} style={{paddingRight: '8%'}} />
            <TextInput value={birthDate} placeholder={'BIRTHDATE'} editable={false} selectTextOnFocus={false} placeholderTextColor={placeholderTextColor} />
          </TouchableOpacity>
          {birthDate !== '' && <Icon5 name={'check'} size={15} color="#9de500" style={{marginLeft: -20}} />}
        </Container>
        <Container>
          <TouchableOpacity onPress={() => setLocationModalVisible(true)} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Ionicon name="pin" size={20} color={iconColor} style={{paddingRight: '9%'}} />
            <TextInput value={location} placeholder={'LOCATION'} editable={false} selectTextOnFocus={false} placeholderTextColor={placeholderTextColor} />
          </TouchableOpacity>
          {location !== '' && <Icon5 name={'check'} size={15} color="#9de500" style={{marginLeft: -20}} />}
        </Container>
        <Container>
          <Ionicon name="heart" size={20} color={iconColor} style={{marginRight: -10}} />
          <TextButton size={25} color={placeholderTextColor} clickedColor={iconColor} gender={gender} setGender={setGender} text={'male'} value={'male'} />
          <TextButton size={25} color={placeholderTextColor} clickedColor={iconColor} gender={gender} setGender={setGender} text={'female'} vlaue={'female'} />
          {gender === '' ? <Icon5 name={'check'} size={15} color={backgroundColor} style={{marginLeft: -20}} /> : <Icon5 name={'check'} size={15} color="#9de500" style={{marginLeft: -20}} />}
        </Container>
        <Block style={{height: '9%'}} />
        <TouchableOpacity
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%', height: '6%', backgroundColor: 'rgba(126, 214, 223,1.0)'}}
          onPress={() => onSubmit()}>
          <Text style={{color: placeholderTextColor, backgroundColor: 'transparent'}}>Submit</Text>
        </TouchableOpacity>
        <Block style={{display: 'flex', flexDirection: 'row'}}>
          <Block style={{zIndex: 3, position: 'absolute', backgroundColor: '#3b3a36', width: '100%', height: '100%'}} />
          <DatePicker
            ref={datePickerRef}
            defaultDate={new Date()}
            minimumDate={new Date(1940, 1, 1)}
            maximumDate={new Date()}
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText=""
            textStyle={{color: 'green'}}
            placeHolderTextStyle={{color: '#d3d3d3'}}
            onDateChange={(e) => setBirthDate(e.toDateString())}
            disabled={false}
          />
        </Block>
        <LocationSelectModal modalVisible={locationModalVisible} setModalVisible={setLocationModalVisible} location={location} setLocation={setLocation} />
      </View>
    </TouchableWithoutFeedback>
  );
};
