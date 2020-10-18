import React from 'react';
import styled from 'styled-components';
import {Header, Left, Body, Right, Title, Radio, Container as NativeContainer} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import constants from '../constants';

export default ({title, leftIcon, rightIcon, size, color, backGroundColor = '#3b3a36', onPress, onSubmit}) => {
  const styles = {
    titleStyle: {
      color: '#fff',
    },
  };

  const CommonHeader = styled(Header)`
    width: ${constants.width};
    padding: 0px 20px;
    background: ${(props) => props.backGroundColor};
  `;
  return (
    <CommonHeader backGroundColor={backGroundColor} transparent>
      <Left>
        <FontAwesomeIcon name={leftIcon} size={size} color={color} onPress={onPress} />
      </Left>
      <Body>
        <Title style={styles.titleStyle}>{title}</Title>
      </Body>
      <Right>
        <FontAwesomeIcon name={rightIcon} size={size} color={color} onPress={onSubmit} />
      </Right>
    </CommonHeader>
  );
};
