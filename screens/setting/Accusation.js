import React from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Content,
  List,
  ListItem,
  Badge,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {useUserInfo} from '../../AuthContext';

export default () => {
  const userInfo = useUserInfo();
  const complainningList = userInfo.user.complainning;
  const complainnedList = userInfo.user.complainned;
  const complainList = [
    {tab: '내가 저지른 신고', list: complainningList},
    {tab: '내가 당한 신고', list: complainnedList},
  ];
  console.log(complainningList);
  return (
    <Container>
      <Tabs>
        {complainList.map((item, index) => (
          <Tab
            key={index}
            heading={
              <TabHeading>
                <Text>{item.tab}</Text>
              </TabHeading>
            }>
            <List>
              {item.list.map((complain, index) => (
                <ListItem avatar key={complain.id}>
                  <Left>
                    <Text>{index + 1}</Text>
                  </Left>
                  <Body>
                    <Text>{complain.category}</Text>
                    <Text note>{complain.comment}</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              ))}
            </List>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};
