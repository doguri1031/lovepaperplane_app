import {gql} from 'apollo-boost';

export const MODIFY_NICKNAME = gql`
  mutation editUser($data: String!, $dataType: String!) {
    editUser(data: $data, dataType: $dataType) {
      id
      username
      nickname
      birthDate
      gender
      location
      createdAt
      machineId
    }
  }
`;

export const MODIFY_BIRTHDATE = gql`
  mutation editUser($data: String!, $dataType: String!) {
    editUser(data: $data, dataType: $dataType) {
      id
      username
      nickname
      birthDate
      gender
      location
      createdAt
      machineId
    }
  }
`;

export const MODIFY_LOCATION = gql`
  mutation editUser($data: String!, $dataType: String!) {
    editUser(data: $data, dataType: $dataType) {
      id
      username
      nickname
      birthDate
      gender
      location
      createdAt
      machineId
    }
  }
`;
