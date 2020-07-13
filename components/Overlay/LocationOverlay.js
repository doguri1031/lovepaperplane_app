import React from "react";
import {ScrollView} from "react-native"
import { CheckBox } from 'react-native-elements'
import styled from "styled-components";
import constants from "../../constants";

const Wrapper = styled.View`
    width:${(constants.width*0.75)}px;
    height:${(constants.height*0.75)}px;
    
`;
const Selection = styled.View`
    margin:5px 0px;

`;

const locationList = [
    {value:'北海道'},
    {value:'青森県'},
    {value:'岩手県'},
    {value:'宮城県'},
    {value:'秋田県'},
    {value:'山形県'},
    {value:'福島県'},
    {value:'茨城県'},
    {value:'栃木県'},
    {value:'群馬県'},
    {value:'埼玉県'},
    {value:'千葉県'},
    {value:'東京都'},
    {value:'神奈川県'},
    {value:'新潟県'},
    {value:'富山県'},
    {value:'石川県'},
    {value:'福井県'},
    {value:'山梨県'},
    {value:'長野県'},
    {value:'岐阜県'},
    {value:'静岡県'},
    {value:'愛知県'},
    {value:'三重県'},
    {value:'滋賀県'},
    {value:'京都府'},
    {value:'大阪府'},
    {value:'兵庫県'},
    {value:'奈良県'},
    {value:'和歌山県'},
    {value:'鳥取県'},
    {value:'島根県'},
    {value:'岡山県'},
    {value:'広島県'},
    {value:'山口県'},
    {value:'徳島県'},
    {value:'香川県'},
    {value:'愛媛県'},
    {value:'高知県'},
    {value:'福岡県'},
    {value:'佐賀県'},
    {value:'長崎県'},
    {value:'熊本県'},
    {value:'大分県'},
    {value:'宮崎県'},
    {value:'鹿児島県'},
    {value:'沖縄県'},
]

export default ({location,setLocation,setLocationOverlay}) => {
    return (
        <Wrapper>
        <ScrollView>
            {locationList.map((item)=>
                <CheckBox key={item.value}
                    title={item.value}  
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o' 
                    checked={item.value===location} 
                    onPress={()=>{setLocation(item.value);
                        setLocationOverlay(false);
                        }
                    }
                />)
            }
        </ScrollView>
        </Wrapper>
    ); 
}