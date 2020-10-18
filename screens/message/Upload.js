import React from 'react';
import {Root, ActionSheet} from 'native-base';
import styled from 'styled-components';
import {Button} from '../../components/Buttons';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import {APOLLO_URI} from '../../apolloClient';
import {useMutation} from 'react-apollo-hooks';

const View = styled.View``;

export default () => {
  const [] = useMutation();
  const takePictureFromCamera = () => {
    Alert.alert('11');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };
  const selectImageFromGallery = () => {
    Alert.alert('22');
    ImagePicker.openPicker({
      multiple: false,
    }).then((image) => {
      console.log(image);
    });
  };
  const upload = (image) => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('description', description);
    // formData.append('files[]', files);
    for (let i = 0; i < files.length; i++) {
      formData.append('file', {
        name: image.path.split('/').pop(),
        type: image.mime,
        uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
      });
    }
    axios
      .post(APOLLO_URI + '/api/upload', formData, {
        headers: {'Content-type': 'multipart/form-data'},
      })
      .then((response) => {
        console.log(JSON.parse(JSON.stringify(response)));
        console.log('file upload success');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('image Upload Post Failed  , Try again !');
      });
  };
  const onPress = () => {
    ActionSheet.show(
      {
        options: ['take a photo', 'select photo from gallery', 'watch a AD', 'cancel'],
        cancelButtonIndex: 3,
        title: '남아있는 비행기 수 : ',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            takePictureFromCamera();
            break;
          case 1:
            selectImageFromGallery();
            break;
          case 2:
            break;
        }
      },
    );
  };
  return (
    <Root>
      <View>
        <Button text="photo" onPress={onPress} />
      </View>
    </Root>
  );
};
