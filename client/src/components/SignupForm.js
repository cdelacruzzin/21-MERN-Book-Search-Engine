import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';   //imports the useMutation hook to allow you to mutate GraphQL data
import Auth from '../utils/auth';   //imports the Auth class to access its functions

import { ADD_USER } from '../utils/mutations';//import the ADD_USER GraphQL mutation from the utils directory


const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  /**Invokes the "useMutation()" hook from Apollo Client.
   * The hook provides functions related to the mutation.
   * "addUser" is a function to trigger the mutation.*/
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target; //destructs event.target to only extract name, and value
    /**creates a shallow copy of userFormData, [name] is an object literal, 
     * in this case, it can either be username, email, or password. depends on the onChange from the input form
     * It updates the value and assigns it to the name (type)
    */
    setUserFormData({ ...userFormData, [name]: value })};

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      //Execute the mutation by calling the "addUser" function.
      // The mutation requires username, email, password variables, which is provided in the userFormData state
      const {data} = await addUser({
        //sets a shallow copy of userFormData as the variables to not manipulate the original data directly.
        variables: { ...userFormData }
      });
      setUserFormData({
        username: '', email: '', password: ''   // sets the form data as empty strings
      })
      Auth.login(data.addUser.token);   //passes the user token to the login function in the Auth utils

    } catch (err) {
      console.log(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
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
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
