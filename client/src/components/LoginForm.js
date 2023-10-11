// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';   //imports useMutation hook from '@apollo/client' package to allow mutation og graphQL data
import {USER_LOGIN} from '../utils/mutations';  //imports the GraphQL mutation for logging in

import Auth from '../utils/auth';   //Imports the "Auth" module from the utils directory

const LoginForm = ({handleModalClose}) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });  // initialize state for the "userFormData" form field
  const [validated] = useState(false);  //initialize the state for 
  const [showAlert, setShowAlert] = useState(false);


  /**
   * Initializing the mutation function using "useMutation" hook from Apollo Client.
   * the first element "login" is a function to execute the mutation.
   * 2nd element provides any errors that arise in the mutation.
   */
  const [login, {error}] = useMutation(USER_LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };


  //async function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();   //prevents the default form submission behaviour

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      //calls the "login" mutation function and passes a shallow copy of "userFormData" as its variables
      const {data} = await login({
        variables: {...userFormData}
      });
      // calls the "login" function from the Auth module.
      //passes the user's login token.
      Auth.login(data.login.token);   

      console.log(data)
      handleModalClose();
    } catch (error) {
      console.log(error)
    }

    //clears the form data input fields
    setUserFormData({
      username: '',
      email: '',
      password: '',
    }); 
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'
          >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
