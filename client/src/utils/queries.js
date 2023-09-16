import { gql } from "@apollo/client";
export const USERS = gql`
query Query {
    users {
      bookCount
      email
      _id
      password
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

export const ME = gql`
query Query {
    me {
      _id
      bookCount
      email
      password
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
`

