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
      room {
        id
      }
      createdAt
    }
  }
`;

export const SENDMESSAGE = gql`
  mutation sendMessage(
    $roomId: String
    $toId: String
    $type: String
    $data: String
  ) {
    sendMessage(roomId: $roomId, toId: $toId, type: $type, data: $data) {
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

export const COMPLAIN = gql`
  mutation complain(
    $messageId: String!
    $toId: String!
    $category: String!
    $comment: String!
  ) {
    complain(
      messageId: $messageId
      toId: $toId
      category: $category
      comment: $comment
    ) {
      id
      from {
        id
      }
      to {
        id
      }
      messageId
      category
      comment
    }
  }
`;
