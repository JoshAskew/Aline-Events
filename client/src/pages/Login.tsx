import { Box, Button, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Link } from "react-router-dom";
import "./Login.css";

import { useState, ChangeEvent, FormEvent } from 'react';
import { login } from '../api/authAPI';
import Auth from '../utils/auth';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
    zipCode: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      setErrorMessage('');
      Auth.login(data.token);
      console.log(data.token);
      
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage('Failed to login');
    }
  };
 
  return (
    <>
      <h1 className="header">Aline</h1>
      <div className="login-form-container">
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} boxShadow="md">
        <Box mb={4}>
          <Heading size="md">Login</Heading>
          <Text fontSize="sm" color="gray.600">
            Fill in the form below to login
          </Text>
        </Box>

        <Box>
        <form onSubmit={handleSubmit}>
            <Stack >
              <Field label="User Name">
                <Input name="userName" type="text" onChange={handleChange}/>
              </Field>

              <Field label="Password">
              <Input name="password" type="password" onChange={handleChange} />
              {errorMessage && <p className= 'error-message'>{errorMessage}</p>}
              </Field>
            </Stack>
        <Box display="flex" justifyContent="center" mt={4}>
          <Link to="/">
            <Button variant="outline" mr={3}>
              Cancel
            </Button>
          </Link>

          <Button type="submit">
            Sign in
          </Button>

        </Box>
          </form>
        </Box>

      </Box>
      </div>
    </>
  );
};

export default Login;
