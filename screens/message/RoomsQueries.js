import {gql} from 'apollo-boost';

export const SEEROOM = gql`
  mutation seeRoom($roomId: String!) {
    seeRoom(roomId: $roomId) {
      id
      participant {
        id
        username
        nickname
        birthDate
        gender
        location
        machineId
        itsMe
      }
      messages {
        id
        data
        type
        to {
          id
          nickname
          itsMe
        }
        from {
          id
          nickname
          itsMe
        }
        isChecked
        updatedAt
      }
      isAlive
      readFlg {
        id
        room {
          id
        }
        fromId
        toId
        checkedTime
        createdAt
        updatedAt
      }
      blockFlg {
        id
        fromId
        toId
        flag
      }
      createdAt
      updatedAt
    }
  }
`;
