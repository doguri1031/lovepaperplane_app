// import React from 'react';
// import {useMutation} from 'react-apollo-hooks';
// import {SENDMESSAGE} from './MessageQueries';
// import styled from 'styled-components';
// import useInput from '../../hooks/useInput';
// import axios from 'axios';
// import {Button} from '../../components/Buttons';
// import {TextInput, TouchableOpacity, Alert, Platform} from 'react-native';
// import {ActionSheet} from 'native-base';
// import Icon from 'react-native-ionicons';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import constants from '../../constants';
// import ImagePicker from 'react-native-image-crop-picker';
// import {APOLLO_URI} from '../../apolloClient';

// const View = styled.View`
//   display: flex;
//   flex-direction: row;
//   height: 50px;
//   justify-content: center;
//   align-items: center;
// `;

// export default ({user, roomId, participant}) => {
//   const text = useInput();
//   const [newMessageMutation] = useMutation(SENDMESSAGE);
//   const textValidate = () => {
//     let textTrimmed = text.value.trim();
//     if (textTrimmed === '') {
//       return false;
//     }
//     return true;
//   };
//   const onSubmit = async () => {
//     if (textValidate()) {
//       const {loading, data} = await newMessageMutation({
//         variables: {
//           roomId: roomId,
//           toId: participant[0].itsMe ? participant[1].id : participant[0].id,
//           type: 'text',
//           data: text.value,
//         },
//       });
//       text.onChangeText('');
//     }
//   };
//   const takePictureFromCamera = () => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then((image) => {
//       console.log(image);
//     });
//   };
//   const selectImageFromGallery = () => {
//     ImagePicker.openPicker({
//       multiple: false,
//     }).then((image) => {
//       console.log(image);
//       upload(image);
//     });
//   };
//   const upload = async (image) => {
//     request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => console.log(result));
//     console.log('upload');
//     console.log(image);
//     const formData = new FormData();
//     console.log('boundary:', formData._boundary);
//     formData.append('file', {
//       name: 'ddddd',
//       type: 'image/jpeg',
//       uri: 'file:///storage/emulated/0/Download/images.jpeg',
//     });
//     console.log(formData);
//     try {
//       await fetch(`${APOLLO_URI}/api/upload`, {
//         method: 'post',
//         headers: {'content-type': 'multipart/form-data'},
//         body: formData,
//       });
//       // await axios.post(`${APOLLO_URI}/api/upload`, formData, {
//       //   headers: {'content-type': 'multipart/form-data'},
//       // });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const onPhotoPress = () => {
//     ActionSheet.show(
//       {
//         options: ['take a photo', 'select photo from gallery', 'watch a AD', 'cancel'],
//         cancelButtonIndex: 3,
//         title: `남아있는 비행기 수 : ${user.availablePlane}`,
//       },
//       (buttonIndex) => {
//         switch (buttonIndex) {
//           case 0:
//             if (user.availablePlane < 1) {
//               Alert.alert('not enough plane');
//             }
//             takePictureFromCamera();
//             break;
//           case 1:
//             if (user.availablePlane < 1) {
//               Alert.alert('not enough plane');
//             }
//             selectImageFromGallery();
//             break;
//           case 2:
//             break;
//         }
//       },
//     );
//   };
//   return (
//     <View>
//       <TouchableOpacity onPress={onPhotoPress}>
//         <FontAwesomeIcon name="file-photo-o" size={30} color="#55efc4" />
//       </TouchableOpacity>
//       <TextInput type="text" {...text} style={{width: 330, marginHorizontal: 10}} placeholder="input your message" />

//       <TouchableOpacity onPress={onSubmit}>
//         <Icon name="paper-plane" size={30} color="#55efc4" />
//       </TouchableOpacity>
//     </View>
//   );
// };