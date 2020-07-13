import React from "react";
import Icon from 'react-native-ionicons'
import PropTypes from "prop-types";
import theme from "../theme";

const NavIcon = ({focused=true,name, size=26, color=theme.blackColor}) => <Icon name={name}  size={size} color={focused?color:theme.darkGreyColor}/>

NavIcon.propTypes = {
    name:PropTypes.string.isRequired,
    size:PropTypes.number,
    color:PropTypes.string,
    focus:PropTypes.bool
}

export default NavIcon