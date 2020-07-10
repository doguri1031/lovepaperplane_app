import React ,{useState}from "react";
import { Text} from "react-native";
import styled from "styled-components";
import {Button} from "../../components/Buttons";
import useInput from "../../hooks/useInput";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Overlay } from 'react-native-elements';
import AuthGenderOverlay from "../../components/Overlay/AuthGenderOverlay"
const View = styled.View`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    flex:1;
`;
const TouchableOpacity = styled.TouchableOpacity`
    width:100%;
`;
export default () => {
    
    const username=useInput("");
    const [gender, setGender] = useState("");
    const [locationOverlay, setLocationOverlay] =useState(false);
    const onPressSignUp=()=>{
        console.log();
    }
    //username, age, gender, location,nickname
    return (
        <View>
            <Text>SignUp</Text>
            <Input
                placeholder='INPUT USERNAME'
                leftIcon={<Icon
                    name='user'
                    size={24}
                    color='black'
                />}
                label='USERNAME'/>
            <Input
            placeholder='INPUT AGE'
            leftIcon={<Icon
                name='calendar'
                size={24}
                color='black'
            />}
            label='age'/>
            <TouchableOpacity onPress={()=>setLocationOverlay(true)}>
                <Input
                    placeholder='INPUT GENDER'
                    disabled={true}
                    value={gender}
                    leftIcon={<Icon
                        name='transgender'
                        size={24}
                        color='black'
                    />}
                    label='GENDER'/>
            </TouchableOpacity>    
            <TouchableOpacity onPress={()=>setLocationOverlay(true)}>
                <Input
                    placeholder='INPUT LOCATION'
                    disabled={true}
                    leftIcon={<Icon
                        name='map-marker'
                        size={24}
                        color='black'
                    />}
                    label='LOCATION'/>
            </TouchableOpacity>    
            <Input
                placeholder='INPUT NICKNAME'
                leftIcon={<Icon
                    name='vcard-o'
                    size={24}
                    color='black'
                />}
                label='NICKNAME'/>
            <Button text={"signup"} onPress={onPressSignUp()}/>
            <Overlay
                isVisible={locationOverlay}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto"
                onBackdropPress={()=>{setLocationOverlay(false); }}
            >
                <AuthGenderOverlay gender={gender} setGender={setGender} setLocationOverlay={setLocationOverlay}/>
            </Overlay>
        </View>
     )
}