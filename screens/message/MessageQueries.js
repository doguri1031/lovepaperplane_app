import {gql} from 'apollo-boost';

export const NEWMESSAGE = gql`
  subscription newMessage($userId: String!) {
    newMessage(userId: $userId) {
      id
      type
      data
      from {
        id
        nickname
        itsMe
      }
      to {
        id
        nickname
        itsMe
      }
      createdAt
    }
  }
`;
