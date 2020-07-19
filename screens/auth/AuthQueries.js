import {gql} from 'apollo-boost';

export const LOGIN = gql`
  query login($machineId: String!) {
    login(machineId: $machineId) {
      id
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $birthDate: String!
    $gender: String!
    $location: String!
    $nickname: String!
    $machineId: String!
  ) {
    createUser(
      username: $username
      birthDate: $birthDate
      gender: $gender
      location: $location
      nickname: $nickname
      machineId: $machineId
    ) {
      id
      username
      birthDate
      gender
      location
      createdAt
      machineId
    }
  }
`;
export const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username)
  }
`;
