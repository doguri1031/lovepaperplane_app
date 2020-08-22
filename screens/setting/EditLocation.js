import React, {useState, userInput, useRef} from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {Input, Button, Header} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {DatePicker, Title} from 'native-base';
import {ListItem} from 'react-native-elements';
import {MODIFY_LOCATION} from './EditQueries';
import {useUserInfo, useUserState, useSetRefresh} from '../../AuthContext';
import {locationList} from '../../components/Overlay/LocationSelector';

const location = locationList;
export default ({navigation}) => {
  const [modifyLocationMutation] = useMutation(MODIFY_LOCATION);
  const userInfo = useUserInfo();
  const setUserState = useUserState();
  const setRefresh = useSetRefresh();

  // Find index in array location
  const [visibleItem, setVisibleItem] = useState(
    location.findIndex((item, i) => {
      return item.value === userInfo.user.location;
    }),
  );

  const toggleMenu = (itemIndex) => {
    setVisibleItem(itemIndex);
  };

  const changeLocation = async () => {
    const {
      data: {editUser},
    } = await modifyLocationMutation({
      variables: {
        data: location[visibleItem].value,
        dataType: 'location',
      },
    });
    if (editUser) {
      userInfo.user.location = editUser.location;
      setRefresh(editUser.location);
      setUserState(userInfo);
      navigation.navigate('EditProfile');
    }
  };
  return (
    <View>
      <ScrollView>
        <View
          style={{
            marginTop: 0,
            width: '100%',
            alignSelf: 'center',
          }}>
          {location.map((l, i) => (
            <ListItem
              key={i}
              title={l.value}
              bottomDivider
              rightIcon={
                visibleItem === i ? (
                  <Icon5 name={'check'} size={20} color="#9de500" />
                ) : (
                  ''
                )
              }
              onPress={() => toggleMenu(i)}
            />
          ))}
        </View>
      </ScrollView>
      <Button
        title="Location Submit"
        onPress={() => changeLocation()}
        style={{
          marginTop: 15,
          width: '70%',
          height: '30%',
          alignSelf: 'center',
        }}
      />
    </View>
  );
};
