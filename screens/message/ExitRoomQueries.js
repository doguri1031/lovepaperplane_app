import {gql} from 'apollo-boost';

export const EXIT_ROOM = gql`
  mutation exitRoom($userId: String!, $roomId: String!, $blockId: String!, $toId: String!) {
    exitRoom(userId: $userId, roomId: $roomId, blockId: $blockId, toId: $toId) {
      id
    }
  }
`;
