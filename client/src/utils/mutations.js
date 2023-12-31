import {gql} from '@apollo/client';

export const ADD_USER = gql`

    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                bookCount
                email
                password
                username
            }
        }
    }
`;

export const USER_LOGIN = gql`

    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                bookCount
                email
                username
                password
                savedBooks {
                  title
                }
            }
        }
    }
`;

export const SAVEBOOK = gql`
mutation Mutation($bookDetails: BookInput!, $user: userInput!) {
    saveBook(bookDetails: $bookDetails, user: $user) {
      _id
      bookCount
      email
      username
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;

export const REMOVEBOOK = gql`
mutation Mutation($bookId: String!, $userId: ID!) {
    removeBook(bookId: $bookId, userId: $userId) {
      _id
      username
      bookCount
      email
      password
      savedBooks {
        authors
        bookId
        description
        title
      }

    }
  }
`;

