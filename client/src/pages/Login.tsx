
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { Link } from 'react-router-dom'
import "./Login.css"

const Login = () => {
    return (
      <>
      <div className="form-container">
      <form>
      <Fieldset.Root size="lg" maxW="md">
    <Stack>
      <Fieldset.Legend>Login</Fieldset.Legend>
    </Stack>

    <Fieldset.Content>
      <Field label="User Name">
        <Input name="User Name" />
      </Field>

      <Field label="Password">
        <Input name="password" type="password" />
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