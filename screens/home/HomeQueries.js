import {gql} from 'apollo-boost';

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
  }
`;
