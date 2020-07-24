import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage,
  Alert,
} from 'react-native';
import {useQuery, useMutation} from 'react-apollo-hooks';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import admob, {
  MaxAdContentRating,
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import {GETUSER, ADDPLANE} from './HomeQueries';
import StatusBar from '../../components/StatusBar';

// Interstitial
InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

//Rewarded
const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Body = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PaperTypeButtons = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  &:only-child {
    margin: 0px 5px;
  }
`;
const Square = styled.View`
  border: 5px solid #00b894;
  padding: 30px 30px;
  border-radius: 100;
  background-color: #dfe6e9;
`;

export default ({navigation}) => {
  const {loading, data, refetch} = useQuery(GETUSER);
  const [adLoaded, setAdLoaded] = useState(false);
  const [addPlaneMutation] = useMutation(ADDPLANE);
  useEffect(() => {
    const eventListener = rewarded.onAdEvent(async (type, error, reward) => {
      console.log(error);
      if (type === RewardedAdEventType.LOADED) {
        setAdLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
        await addPlaneMutation();
      }
    });
    refetch();
    // Start loading the rewarded ad straight away
    rewarded.load();
    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  const onCreateRoom = () => {
    if (data.getUser.availablePlane < 1) {
      Alert.alert('비행기가 없음. 광고 보세요');
      return;
    }
    navigation.navigate('CreateRoom');
  };
  return (
    <Wrapper>
      {loading ? (
        <ActivityIndicator animating={loading} color="#0000aa" size="large" />
      ) : (
        <Body>
          <PaperTypeButtons>
            <TouchableOpacity onPress={onCreateRoom}>
              <Square>
                <Icon
                  style={{marginRight: 10}}
                  name="paper-plane"
                  size={120}
                  color="#55efc4"
                />
              </Square>
            </TouchableOpacity>
          </PaperTypeButtons>
          <StatusBar
            airplaneNumber={data.getUser.availablePlane}
            maxNumber={10}
          />
          <Text>{`${data.getUser.availablePlane}  / 10 개`}</Text>
          {adLoaded && (
            <TouchableOpacity
              onPress={() => {
                rewarded.show();
              }}>
              <Text>{'보상광고'}</Text>
            </TouchableOpacity>
          )}
        </Body>
      )}
    </Wrapper>
  );
};
