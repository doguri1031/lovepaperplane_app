import {gql} from 'apollo-boost';

export const SEARCH_ROOMLIST = gql`
  query seeRooms($userId: String!) {
    seeRooms(userId: $userId) {
      id
      participantA {
        id
        username
        nickname
      }
      participantB {
        id
        username
        nickname
      }
      lastCheckTimeA
      lastCheckTimeB
      messages {
        id
      }
      isAlive
      createdAt
      updatedAt
    }
  }
`;
