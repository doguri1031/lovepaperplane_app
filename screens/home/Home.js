import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  ImageBackground,
  Image,
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
  width: 100%;
  height: 100%;
`;
const PaperTypeButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  margin-left: 15px;
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

  const onCreateRoom = (planeType) => {
    if (
      (planeType === 'normal' && data.getUser.normalPlane < 1) ||
      (planeType === 'gold' && data.getUser.goldPlane < 1)
    ) {
      Alert.alert('비행기가 없음. 광고 보세요');
      return;
    }
    navigation.navigate('CreateRoom', {planeType: planeType});
  };
  return (
    <Wrapper>
      {loading ? (
        <ActivityIndicator animating={loading} color="#0000aa" size="large" />
      ) : (
        <ImageBackground
          source={require('../../images/skytoon.jpg')}
          style={{
            flex: 1,
            // remove width and height to override fixed static size
            width: '100%',
            height: null,
          }}>
          <PaperTypeButtons style={{marginTop: 20}}>
            <TouchableOpacity onPress={() => onCreateRoom('normal')}>
              <Icon
                style={{marginRight: 10}}
                name="paper-plane"
                size={30}
                color="#55efc4"
              />
              <Text>{`${data.getUser.normalPlane}  / 3 개`}</Text>
            </TouchableOpacity>
          </PaperTypeButtons>
          <PaperTypeButtons>
            <TouchableOpacity onPress={() => onCreateRoom('gold')}>
              <Icon
                style={{marginRight: 10}}
                name="paper-plane"
                size={30}
                color="#f1c40f"
              />
              <Text>{`${data.getUser.goldPlane}  / 10 개`}</Text>
            </TouchableOpacity>
          </PaperTypeButtons>
          <PaperTypeButtons></PaperTypeButtons>
          <PaperTypeButtons></PaperTypeButtons>
          <PaperTypeButtons></PaperTypeButtons>
          <PaperTypeButtons style={{flexDirection: 'row-reverse'}}>
            <TouchableOpacity>
              <Image
                source={require('../../images/postbox.png')}
                style={{
                  flex: 1,
                  // remove width and height to override fixed static size
                  width: 40,
                  height: null,
                }}
              />
            </TouchableOpacity>
          </PaperTypeButtons>
          {adLoaded && (
            <TouchableOpacity
              onPress={() => {
                rewarded.show();
              }}>
              <Text>{'보상광고'}</Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      )}
    </Wrapper>
  );
};
