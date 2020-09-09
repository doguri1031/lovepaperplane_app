import React from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
} from 'native-base';

export default () => {
  return (
    <Container>
      <Tabs>
        <Tab
          heading={
            <TabHeading>
              <Text>내가 저지른 신고</Text>
            </TabHeading>
          }>
          <Text>1</Text>
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>내가 당한 신고</Text>
            </TabHeading>
          }>
          <Text>2</Text>
        </Tab>
      </Tabs>
    </Container>
  );
};
