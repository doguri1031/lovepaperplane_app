import React from 'react';
import styled from 'styled-components';
import {View, Image} from 'react-native';
import Header from './Header';

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: black;
`;
const PhotoBox = styled(Image)`
  width: 100%;
  height: 80%;
`;
export default ({uri, setPhotoUri}) => {
  return (
    <Wrapper>
      <Header title="Create Room" leftIcon="step-backward" size={20} rightIcon="paper-" backGroundColor={'black'} color="white" onPress={() => setPhotoUri(null)} />
      <PhotoBox source={{uri: uri}} />
    </Wrapper>
  );
};
