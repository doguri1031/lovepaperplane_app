import React, {useState} from "react";

export default (prop) => {
    const [value, setValue] = useState(prop);
    function onChangeText(text){
        setValue(text);
    }
    return {value, onChangeText}
}