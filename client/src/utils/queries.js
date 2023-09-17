/** imports the gql tag from @apollo/client.
 * gql is a template literal tag that allows you to write graphQL queries.
 */
import { gql } from "@apollo/client";

/** defines a GraphQL query and exports it. This query is "Query". the query fetches user documents and for each user, in this case, it retrieves:
 * all fields of the user type, along with all fields of the Book in the saveBooks field.
 * this "USERS" can be use in our app with the use of Apollo Client's "useQuery" hook to use this query to fetch the data from the GraphQL server
*/
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

