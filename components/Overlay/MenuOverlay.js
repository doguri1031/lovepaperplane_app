import React from 'react';
import {TouchableHighlight, Text, StyleSheet, Dimensions} from 'react-native';

import styles from '../style/MenuOverlayStyle';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
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
});

export default () => {
  return (
    <TouchableHighlight
      onPress={() => {
        onToggleMenu();
      }}
      style={styles.overlay}>
      <Text></Text>
    </TouchableHighlight>
  );
};
