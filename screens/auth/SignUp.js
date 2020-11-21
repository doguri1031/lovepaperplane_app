import React, {useState, useRef, useEffect} from 'react';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {CHECK_USERNAME, CREATE_USER} from './AuthQueries';
import {Text, TouchableWithoutFeedback, Keyboard, TextInput as NativeTextInput} from 'react-native';
import constants from '../../constants';
import styled from 'styled-components';
import {Button} from '../../components/Buttons';
import useInput from '../../hooks/useInput';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  border-bottom-color: red;
  border-bottom-width: 2px;
  padding-bottom: 2px;
  background-color: 'rgba(0,0,0,0)';
  width: 70%;
  align-items: center;
`;
const TextInput = styled(NativeTextInput)`
  font-size: 20px;
  color: white;
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
  const logUserIn = useLogUserIn();
  const datePickerRef = useRef();
  const {data, loading, refetch} = useQuery(CHECK_USERNAME, {
    variables: {username: username.value},
    skip: username.value === '',
  });
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

  const date = new Date();
  console.log(1);
  const onPressSignUp = () => {
    console.log();
  };

  const validate = () => {
    setIsSubmitClicked(true);
    if (username.value === '' || data.checkUsername === false) {
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
      console.log('machineId:' + createUser.createUser.machineId);
      logUserIn(createUser.createUser);
      console.log('ddd');
    }
  };
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text>SignUp</Text>
        <Container>
          <Ionicon name="person" size={20} color="#4F8EF7" style={{paddingRight: '7%'}} />
          <TextInput placeholder={'USERNAME'} {...username} />
        </Container>
        <Container>
          <Ionicon name="happy" size={20} color="#4F8EF7" style={{paddingRight: '7%'}} />
          <TextInput placeholder={'NICKNAME'} {...nickname} />
        </Container>
        <Container>
          <TouchableOpacity onPress={() => datePickerRef.current.showDatePicker()} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Ionicon name="calendar" size={20} color="#4F8EF7" style={{paddingRight: '7%'}} />
            <TextInput value={birthDate} placeholder={'BIRTHDATE'} editable={false} selectTextOnFocus={false} />
          </TouchableOpacity>
        </Container>
        <Container>
          <TouchableOpacity onPress={() => setLocationModalVisible(true)} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Ionicon name="pin" size={20} color="#4F8EF7" style={{paddingRight: '7%'}} />
            <TextInput value={location} placeholder={'LOCATION'} editable={false} selectTextOnFocus={false} />
          </TouchableOpacity>
        </Container>
        <Container>
          <Ionicon name="pin" size={20} color="#4F8EF7" style={{paddingRight: '8%'}} />
          <TextButton size={25} color={'black'} clickedColor={'red'} gender={gender} setGender={setGender} text={'male'} value={'male'} />
          <TextButton size={25} color={'black'} clickedColor={'red'} gender={gender} setGender={setGender} text={'female'} vlaue={'female'} />
        </Container>
        <Block style={{height: '8%'}} />
        <Button text={'signup'} onPress={() => onSubmit()} />

        <Overlay
          isVisible={genderOverlay}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="red"
          width="auto"
          height="auto"
          onBackdropPress={() => {
            setGenderOverlay(false);
          }}>
          <GenderOverlay gender={gender} setGender={setGender} setGenderOverlay={setGenderOverlay} />
        </Overlay>
        <Overlay
          isVisible={locationOverlay}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="red"
          width="auto"
          height="auto"
          onBackdropPress={() => {
            setLocationOverlay(false);
          }}>
          <LocationOverlay location={location} setLocation={setLocation} setLocationOverlay={setLocationOverlay} />
        </Overlay>
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
        <LocationSelectModal modalVisible={locationModalVisible} setModalVisible={setLocationModalVisible} location={location} setLocation={setLocation} />
      </View>
    </TouchableWithoutFeedback>
  );
};
