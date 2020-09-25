import {gql} from 'apollo-boost';

export const LEAVE_APP = gql`
  mutation leaveApp($userId: String!) {
    leaveApp(userId: $userId) {
      id
    }
  }
`;
