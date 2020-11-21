import React from 'react';
import styled from 'styled-components';
import {View, Image, Alert} from 'react-native';
import FastImage from 'react-native-fast-image'
import constants from '../constants';
import Header from './Header';

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index:2;
`;
const PhotoContainer = styled(View)`
  width:100%;
  height:85%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  z-index:1;

`;
export default ({uri, setPhotoUri}) => {
  return (
    <Wrapper>
      <Header title="FullSizePhoto" leftIcon="step-backward" size={20} rightIcon="paper-" backGroundColor={'black'} color="white" onPress={() =>{setPhotoUri(null)}} />
        <PhotoContainer>
        <FastImage style={{ width: constants.width, height: constants.height }}
          source={{
              uri: uri,
              priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}/>
     </PhotoContainer>
    </Wrapper>
  );
};
