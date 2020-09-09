import React from 'react';
import {Root, ActionSheet} from 'native-base';
import styled from 'styled-components';
import {Button} from '../../components/Buttons';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const View = styled.View``;

export default () => {
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
      multiple: true,
    }).then((images) => {
      console.log(images);
    });
  };

  const onPress = () => {
    ActionSheet.show(
      {
        options: [
          'take a photo',
          'select photo from gallery',
          'watch a AD',
          'cancel',
        ],
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
