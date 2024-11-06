import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import './SignUp.css'
import { useState } from 'react';


const SignUp = () => {

  const [user, setUser] = useState({
    userName: '',
    zipCode: '',
    password: '',
  }); 

  const [passwordConfirm, setPasswordConfirm] = useState(''); 

  const handleSearchFormSubmit =  async (event: any): Promise<void> => {

    event.preventDefault();

    if (!user.password || !user.zipCode || !user.userName) {
        throw new Error('Please fill out all values, values cannot be blank');
    }

    if (user.password  === passwordConfirm) {
      throw new Error('Passwords much match');
    }

    //fetch to api routes, hit the routes that updates the database to the user
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const result = await response.json();
      console.log("User successfully signed up:", result);
    } catch (error) {
      console.error("Error: User faield to signed up");
    }
  };


  //this will handle all the inputs and store them into user state change and return back values, event click or change, target is element interacted with
  // runs every time the type 
  const handleInputChange = async (event: any): Promise<void> =>{
    
    //consoles in readtime inputs being updated
    console.log(event.target.value);

    //if we are setting passwordConfirm then setPasswordConfirm with the value of passwordConfirm string else set the objects individually
    if(event.target.name === 'passwordConfirm'){
      setPasswordConfirm(event.target.value)
    }else{
      setUser({...user, [event.target.name]:event.target.value})
    }
  }


    return (
      <> 
        <h1>Sign Up and Never Miss Out</h1>
        <div className="form-container">
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
          {/* value={user.userName} updates the state userName */}
          <Input name="userName" onChange={handleInputChange} value={user.userName} />
        </Field>

        <Field label="Zip Code">
          <Input name="zipCode" onChange={handleInputChange} value={user.zipCode}/>
        </Field>

        <Field label="Password">
          <Input name="password" type="password" onChange={handleInputChange} value={user.password} />
        </Field>

        <Field label="Confirm Password">
          <Input name="confirmPassword" type="password" />
        </Field>
      
      </Fieldset.Content>

      <Button onChange={handleSearchFormSubmit} name="submit" type="submit" alignSelf="flex-start">
        Sign Up
      </Button>
    </Fieldset.Root>
        </form>
        </div>
      </>
 
  
    )
};

export default SignUp;