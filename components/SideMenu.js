import React, {useState} from 'react';
import {View, Text} from 'react-native';

import MenuList from './containers/MenuList';
import MenuOverlay from './containers/MenuOverlay';

import styles from './style/SideMenuStyle';
import {StyleSheet, Dimensions} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  menu: {
    flex: 1,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.8,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  menuItem: {
    paddingTop: 10,
  },
});

export default (navigation, onToggleMenu) => {
  return (
    <View style={styles.container}>
      <MenuOverlay onToggleMenu={onToggleMenu} navigation={navigation} />
      <View style={styles.menu}>
        <MenuList onToggleMenu={onToggleMenu} navigation={navigation} />
      </View>
    </View>
  );
};
