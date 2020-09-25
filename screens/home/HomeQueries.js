import {gql} from 'apollo-boost';

export const ADDPLANE = gql`
  mutation addPlane {
    addPlane {
      id
      username
      birthDate
      gender
      rooms {
        id
      }
      location
      machineId
      itsMe
      normalPlane
      goldPlane
      createdAt
      updatedAt
    }
  }
`;

export const CREATEROOM = gql`
  mutation createRoom($planeType: String!, $location: String!, $data: String!) {
    createRoom(planeType: $planeType, location: $location, data: $data) {
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
        createdAt
        updatedAt
      }
      isAlive
      blockFlg {
        id
        fromId
        toId
        flag
      }
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
      createdAt
      updatedAt
    }
  }
`;

export const GETUSER = gql`
  query getUser {
    getUser {
      id
      username
      birthDate
      gender
      rooms {
        id
      }
      location
      machineId
      itsMe
      normalPlane
      goldPlane
      createdAt
      updatedAt
    }
    seeRooms {
      id
      participant {
        id
        nickname
      }
      messages {
        id
      }
      isAlive
      createdAt
      updatedAt
    }
  }
`;
