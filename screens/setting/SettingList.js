import React, {useState} from 'react';
import {TouchableOpacity, View, Switch, Text, ScrollView} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import ToggleSwitch from 'toggle-switch-react-native';

export default ({navigation}) => {
  const [switchValue, setSwitchValue] = useState(false);
  toggleSwitch = () => {
    setSwitchValue((previousState) => !previousState);
  };

  return (
    <ScrollView>
      <View>
        <ListItem
          title="Edit Profile"
          bottomDivider
          chevron
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ListItem
          title={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 16, marginRight: 20}}>配信：</Text>
              <ToggleSwitch
                isOn={switchValue}
                onToggle={(isOn) => setSwitchValue(isOn)}
              />
            </View>
          }
          leftIcon={<Icon5 name={'sms'} size={20} color="#228b22" />}
          bottomDivider
        />
      </View>
      <ListItem
        title="신고 건수"
        bottomDivider
        chevron
        onPress={() => navigation.navigate('Accusation')}
      />
    </ScrollView>
  );
};
