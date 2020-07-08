import React from "react";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import theme from "../theme";

const NavIcon = ({focused=true,name, size=26, color=theme.blackColor}) => <Ionicons name={name} size={size} color={focused?color:theme.darkGreyColor}/>

NavIcon.propTypes = {
    name:PropTypes.string.isRequired,
    size:PropTypes.number,
    color:PropTypes.string,
    focus:PropTypes.bool
}

export default NavIcon