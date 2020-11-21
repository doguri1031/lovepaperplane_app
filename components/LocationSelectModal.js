import React from 'react';
import styled from 'styled-components';
import {Keyboard, Alert,TouchableOpacity,ScrollView, Text,Modal,TouchableWithoutFeedback} from 'react-native';
import constants,{locationList} from '../constants';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

const MWrapper = styled.View`
    width:${(props)=>props.constants.width};
    height:${(props)=>props.constants.height};
    z-index:2;
    background-color:transparent;
    display:flex;
    justify-content:flex-start;
    align-items:center;
`;

const MContainer = styled.View`
    width:${(props)=>props.constants.width*3/4};
    height:${(props)=>props.constants.height/2};
    background-color:white;
    margin-top:${(props)=>props.constants.height/9};
    opacity:1;
    border-radius:8;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Header= styled.View`
    color:black;
    height:20%;
    width:100%;
    padding-left:10%;
    border-bottom-color:#b2bec3;
    border-bottom-width:0.2px;
    display:flex;
    justify-content:center;
`;
const Content = styled.View`
    width:100%;
    height:65%;
    display:flex;
    flex-direction:column;
    align-items:center;
    border-bottom-color:#dfe6e9;
    border-bottom-width:0.2px;
`;
const Footer =styled.View`
    width:100%;
    height:15%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;
const Item = styled.View`
    height:5%;
    width:100%;
    padding-left:10%;
    padding-top:3%;
    display:flex;
    flex-direction:row;
    align-items:baseline;
    
`;

export default ({location,setLocation,modalVisible,setModalVisible}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
              <TouchableWithoutFeedback onPress={()=>setModalVisible(false)} >
              <MWrapper constants={constants} >
              <MContainer constants={constants}>
                <Header>
                    <Text style={{fontSize:20, fontWeight:'700'}}>지역을 입력해주세요</Text>
                </Header>
                <Content>
                    <ScrollView  style={{width:'100%'}}>
                        {locationList.map((item)=>(
                        <TouchableOpacity style={{flex: 1}} onPress={()=>{setLocation(item);setModalVisible(false)}} key={item}>
                            <Item>
                                <Text style={{width:'50%' ,marginVertical:4}}>
                                    {item}
                                </Text>
                                {location===item&&<Icon5 name={'check'} size={15} color="#9de500" style={{paddingLeft:'25%'}}/>}
                            </Item>
                        </TouchableOpacity>))
}
                    </ScrollView>
                </Content>
                <Footer>
                    <TouchableOpacity onPress={()=>setModalVisible(false)}>
                        <Text style={{color:'#FF457F', fontWeight:'500'}}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </Footer>
              </MContainer>
              </MWrapper>
              </TouchableWithoutFeedback>

          </Modal>
    );
}