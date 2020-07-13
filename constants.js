import {Dimensions} from "react-native";
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get("screen");
const machineId = DeviceInfo.getUniqueId();
export default {width,height,machineId};