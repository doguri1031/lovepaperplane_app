import React, {useState, useRef, useEffect} from 'react';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {CHECK_USERNAME, CREATE_USER} from './AuthQueries';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
} from 'react-native';
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

const View = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`;
export default () => {
  const username = useInput('');
  const nickname = useInput('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [genderOverlay, setGenderOverlay] = useState(false);
  const [locationOverlay, setLocationOverlay] = useState(false);
  const [usernameError, setUsernameError] = useState('');
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
      logUserIn(createUser.createUser.machineId);
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

        <TouchableOpacity onPress={() => setGenderOverlay(true)}>
          <Input
            errorMessage={
              isSubmitClicked && gender === '' ? 'fill in gender' : ''
            }
            placeholder="INPUT GENDER"
            disabled={true}
            value={gender}
            leftIcon={<Icon name="transgender" size={24} color="black" />}
            label="GENDER"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLocationOverlay(true)}>
          <Input
            errorMessage={
              isSubmitClicked && location === '' ? 'fill in location' : ''
            }
            placeholder="INPUT LOCATION"
            disabled={true}
            value={location}
            leftIcon={<Icon name="map-marker" size={24} color="black" />}
            label="LOCATION"
          />
        </TouchableOpacity>
        <Input
          {...usernameError}
          placeholder="INPUT USERNAME"
          {...username}
          leftIcon={<Icon name="user" size={24} color="black" />}
          label="USERNAME"
        />
        <Input
          errorMessage={
            isSubmitClicked && nickname.value === '' ? 'fill in nickname' : ''
          }
          placeholder="INPUT NICKNAME"
          {...nickname}
          leftIcon={<Icon name="vcard-o" size={24} color="black" />}
          label="NICKNAME"
        />
        <TouchableOpacity
          onPress={() => datePickerRef.current.showDatePicker()}>
          <Input
            errorMessage={
              isSubmitClicked && birthDate === '' ? 'fill in birthdate' : ''
            }
            disabled={true}
            value={birthDate}
            placeholder="INPUT AGE"
            leftIcon={<Icon name="calendar" size={24} color="black" />}
            label="age"
          />
        </TouchableOpacity>
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
          <GenderOverlay
            gender={gender}
            setGender={setGender}
            setGenderOverlay={setGenderOverlay}
          />
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
          <LocationOverlay
            location={location}
            setLocation={setLocation}
            setLocationOverlay={setLocationOverlay}
          />
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
      </View>
    </TouchableWithoutFeedback>
  );
};
