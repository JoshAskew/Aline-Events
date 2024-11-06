
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { Link } from 'react-router-dom'
import "./Login.css"

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
      <div className="form-container">
      <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
    <Stack>
      <Fieldset.Legend>Login</Fieldset.Legend>
    </Stack>

    <Fieldset.Content>
      <Field label="User Name">
      </Field>

      <Field label="Zip Code">
        <Input name="zipCode" onChange={handleChange} />
      </Field>
      
      <Field label="Password">
        <Input name="password" type="password" onChange={handleChange} />
      </Field>
    
    </Fieldset.Content>
    <Link to="/Home">
    <Button type="submit" alignSelf="flex-start">
      Login
    </Button>
    </Link>
  </Fieldset.Root>
      </form>
      </div>
      </>
    );

};

export default Login;