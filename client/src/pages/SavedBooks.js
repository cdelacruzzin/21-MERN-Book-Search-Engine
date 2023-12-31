import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { removeBookId } from '../utils/localStorage';   //imports the removeBookId function from the localStorage utils file.
import Auth from '../utils/auth'; //imports the Auth class to have access the authentication functions
import { useQuery, useMutation } from '@apollo/client';   //imports useQuery and useMutation hook.
import { ME } from '../utils/queries';  //imports the graphql "ME" query to fetch the current user's data
import {REMOVEBOOK} from '../utils/mutations'; //imports the graphql REMOVEBOOK mutatio to remove a book from the current user's saveBook array field

const SavedBooks = () => {

  /**Executes ME using useQuery hook, which returns an object, but we are destructing to onlty extract loading, data, and error */
  const { loading, data, error } = useQuery(ME, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  }); //calls the ME query using "useQuery", and extracting only loading, data, and error

  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
console.log(data);
    // data and data.me checks if "data" exists and if there's a "me" property inside it.
    // "data" may be undefined until the GraphQL query is completed.
    // console.log(data)
    if (data && data.me) {
      // if exists, the "userData" state is updated with the value of "data.me"
      setUserData(data.me);
    }
  }, [data]); // this "useEffect" will only run again if the value of "data" changes.
  //When GraphQL query completes and get results, "data" changes, so "useEffect" runs again and update the "userData" state

  // create function that accepts the book's mongo _id value as param and deletes the book from the database

  const [removeBook] = useMutation(REMOVEBOOK)
  const handleDeleteBook = async (bookId) => {
    try {
      const user = Auth.getProfile().data;
      const response = await removeBook({
        variables: {bookId: bookId, userId: user._id}
      })

      /**passes the bookId to removeBookId().
       * returns a boolean whether the bookId has been removed from local storage or not.
       */
      removeBookId(bookId);
    } catch (error) {
      console.log(error)
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
