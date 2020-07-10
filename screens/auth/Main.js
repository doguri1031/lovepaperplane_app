import React from "react";
import { Text} from "react-native";
import LottieView from 'lottie-react-native';
import styled from "styled-components";
import {Button} from "../../components/Buttons";
const View = styled.View`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    flex:1;
`;
const LottieContainer = styled.View`
    width:250px;
    height:250px;
`;

export default ({navigation}) => {

    return (
        <View>
            <LottieContainer>
                <LottieView source={require('../../lottie/message-received.json')} autoPlay loop />
            </LottieContainer>
            <Text>Main</Text>
            <Button text="sign up" onPress={()=>navigation.navigate("SignUp")}/>
        </View>
    );
}