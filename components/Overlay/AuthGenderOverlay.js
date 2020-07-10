import React from "react";
import { CheckBox } from 'react-native-elements'
const genderList =[
    {value:'male'},
    {value:'female'}
];

export default ({gender,setGender,setLocationOverlay}) => {
    return (
        <>
            {genderList.map(item=>
                <CheckBox title={item.value}  
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o' 
                    checked={item.value===gender} 
                    onPress={()=>{setGender(item.value);
                        setLocationOverlay(false);
                        }
                    }
                />)
            }
        </>
    ); 
}