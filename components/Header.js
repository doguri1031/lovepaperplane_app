import React from 'react';
import styled from 'styled-components';
import {Header, Left, Body, Right, Title, Radio, Container as NativeContainer} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default ({title, leftIcon, rightIcon, size, color, onPress, onSubmit}) => {
  const styles = {
    titleStyle: {
      color: '#fff',
    },
  };

  const CommonHeader = styled(Header)`
    display: flex;
    width: 100%;
    padding: 0px 20px;
    background: #3b3a36;
  `;
  return (
    <CommonHeader transparent>
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
