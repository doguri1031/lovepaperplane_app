import React, {useState} from 'react';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import ToggleSwitch from 'toggle-switch-react-native';
import Dialog from 'react-native-dialog';

export default ({navigation}) => {
  const [switchValue, setSwitchValue] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  toggleSwitch = () => {
    setSwitchValue((previousState) => !previousState);
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleLeaveApp = () => {
    alert('onPressed leave Button');
  };

  return (
    <ScrollView>
      <View>
        <ListItem title="Edit Profile" bottomDivider chevron onPress={() => navigation.navigate('EditProfile')} />
        <ListItem
          title={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, marginRight: 20}}>配信：</Text>
              <ToggleSwitch isOn={switchValue} onToggle={(isOn) => setSwitchValue(isOn)} />
            </View>
          }
          leftIcon={<Icon5 name={'sms'} size={20} color="#228b22" />}
          bottomDivider
        />
      </View>
      <ListItem title="신고건수" bottomDivider chevron onPress={() => navigation.navigate('Accusation')} />
      <ListItem title="회원탈퇴" bottomDivider chevron onPress={() => showDialog()} />
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Description>チャットから退出しますか</Dialog.Description>
        <Dialog.Button label="退出" onPress={handleLeaveApp} />
        <Dialog.Button color="red" label="キャンセール" onPress={handleCancel} />
      </Dialog.Container>
    </ScrollView>
  );
};
