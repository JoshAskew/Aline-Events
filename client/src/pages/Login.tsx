import { Box, Button, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Link } from "react-router-dom";
import "./Login.css";

import { useState, ChangeEvent, FormEvent } from 'react';
import { login } from '../api/authAPI';
import Auth from '../utils/auth';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
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
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
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
                <Input name="username" type="text" onChange={handleChange}/>
              </Field>

              <Field label="Password">
              <Input name="password" type="password" onChange={handleChange} />
              </Field>
            </Stack>
          </form>
        </Box>

        <Box display="flex" justifyContent="center" mt={4}>
          <Link to="/">
            <Button variant="outline" mr={3}>
              Cancel
            </Button>
          </Link>
          <Link to="/home">
          <Button type="submit">
            Sign in
          </Button>
          </Link>
        </Box>
      </Box>
      </div>
    </>
  );
};

export default Login;
