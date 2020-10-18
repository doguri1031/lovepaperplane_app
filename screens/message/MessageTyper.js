import React from 'react';
import {useMutation} from 'react-apollo-hooks';
import {SENDMESSAGE} from './MessageQueries';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import {Button} from '../../components/Buttons';
import {TextInput, TouchableOpacity, Alert, Platform} from 'react-native';
import {ActionSheet} from 'native-base';
import Icon from 'react-native-ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import constants from '../../constants';
import {APOLLO_URI} from '../../apolloClient';
import ImagePicker from 'react-native-image-crop-picker';
import { imageResizer } from '../../utils';

const View = styled.View`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export default ({user, roomId, participant}) => {
  const text = useInput();
  const [newMessageMutation] = useMutation(SENDMESSAGE);
  const textValidate = () => {
    let textTrimmed = text.value.trim();
    if (textTrimmed === '') {
      return false;
    }
    return true;
  };
  const onSubmit = async () => {
    if (textValidate()) {
      const {loading, data} = await newMessageMutation({
        variables: {
          roomId: roomId,
          toId: participant[0].itsMe ? participant[1].id : participant[0].id,
          type: 'text',
          data: text.value,
        },
      });
      text.onChangeText('');
    }
  };
  const takePictureFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };
  const selectImageFromGallery = async() => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(async(image) => {
      console.log(image);
      resizedImage= await imageResizer(image);
      resizedImage.mime = image.mime;
      resizedImage.path = resizedImage.uri;
      console.log('check');
      console.log(resizedImage);
      upload(resizedImage);
    });
  };
  const upload = async (image) => {
    const formData = new FormData();
    // formData.append('files[]', files);
    formData.append('user_id', 'dd');
    formData.append('description', 'dd');
    console.log('in upload');
    console.log(image);
    formData.append('file', {
      name: image.path.split('/').pop(),
      type: image.mime,
      uri: image.path,
    });

    console.log('go axios');
    console.log(JSON.stringify(formData._parts[2][1]));
    axios
      .post(APOLLO_URI + '/api/upload', formData, {
        headers: {'Content-type': 'multipart/form-data'},
      })
      .then(async (response) => {
        Alert.alert('Upload Post Successfully ' + '');
        console.log(response.data);
        console.log('00');

        const jsonResponse = JSON.parse(JSON.stringify(response.data));
        console.log(jsonResponse.location);
        const {loading: photoLoading, data: photoData} = await newMessageMutation({
          variables: {
            roomId: roomId,
            toId: participant[0].itsMe ? participant[1].id : participant[0].id,
            type: 'photo',
            data: jsonResponse.location,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('image Upload Post Failed  , Try again !');
      });
  };

  const onPhotoPress = () => {
    ActionSheet.show(
      {
        options: ['take a photo', 'select photo from gallery', 'watch a AD', 'cancel'],
        cancelButtonIndex: 3,
        title: `남아있는 비행기 수 : ${user.availablePlane}`,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            if (user.availablePlane < 1) {
              Alert.alert('not enough plane');
            }
            takePictureFromCamera();
            break;
          case 1:
            if (user.availablePlane < 1) {
              Alert.alert('not enough plane');
            }
            selectImageFromGallery();
            break;
          case 2:
            break;
        }
      },
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={onPhotoPress}>
        <FontAwesomeIcon name="file-photo-o" size={30} color="#55efc4" />
      </TouchableOpacity>
      <TextInput type="text" {...text} style={{width: 330, marginHorizontal: 10}} placeholder="input your message" />

      <TouchableOpacity onPress={onSubmit}>
        <Icon name="paper-plane" size={30} color="#55efc4" />
      </TouchableOpacity>
    </View>
  );
};
