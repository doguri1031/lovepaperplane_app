import React from "react";
import {Text} from "react-native";
import styled from "styled-components";

const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

export default () => {

    return (
        <View>
            <Text>settingList</Text>
        </View>
    );
}