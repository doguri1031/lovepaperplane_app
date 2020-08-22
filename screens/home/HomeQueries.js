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
      availablePlane
      createdAt
      updatedAt
    }
  }
`;

export const CREATEROOM = gql`
  mutation createRoom($location: String!, $data: String!) {
    createRoom(location: $location, data: $data) {
      id
      participantB {
        id
        username
        nickname
        birthDate
        gender
        location
        machineId
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
      availablePlane
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
