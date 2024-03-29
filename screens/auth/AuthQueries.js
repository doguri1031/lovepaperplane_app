import {gql} from 'apollo-boost';

export const LOGIN = gql`
  query login($machineId: String!) {
    login(machineId: $machineId) {
      user {
        id
        username
        nickname
        birthDate
        gender
        location
        # pushFlag
        normalPlane
        goldPlane
        complainning {
          id
          from {
            id
            username
          }
          to {
            id
            username
          }
          messageId
          category
          comment
        }
        complainned {
          id
          from {
            id
            username
          }
          to {
            id
            username
          }
          messageId
          category
          comment
        }
        createdAt
        updatedAt
      }
      rooms {
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
  }
`;
export const CREATE_USER = gql`
  mutation createUser($username: String!, $birthDate: String!, $gender: String!, $location: String!, $nickname: String!, $machineId: String!) {
    createUser(username: $username, birthDate: $birthDate, gender: $gender, location: $location, nickname: $nickname, machineId: $machineId)
  }
`;
