import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "../components/ui/field"

const SignUp = () => {
    return (
      <> 
        <h1>Sign Up and Never Miss Out</h1>
        <form>
        <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field label="User Name">
          <Input name="User Name" />
        </Field>

        <Field label="Zip Code">
          <Input name="zipcode" />
        </Field>

        <Field label="Password">
          <Input name="password" type="password" />
        </Field>

        <Field label="Confirm Password">
          <Input name="password" type="password" />
        </Field>
      
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Sign Up
      </Button>
    </Fieldset.Root>
        </form>
      </>
 
  
    )
};

export default SignUp;