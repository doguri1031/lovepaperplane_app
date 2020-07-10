import React, {useState} from "react";

export default (prop) => {
    const [value, setValue] = useState(prop);
    function onChange(e){
        setValue(e.target.value);
    }
    return {value, onChange}
}