import React from 'react';
import FastImage from 'react-native-fast-image'
import constants from '../constants';

export default ({uri}) =>{
    return (
        <FastImage style={{ width: constants.width/2, height: constants.width/3,borderRadius:15 }}
        source={{
            uri: uri,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
        
        />
    )
}