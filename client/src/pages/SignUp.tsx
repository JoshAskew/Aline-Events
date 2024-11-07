import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import './SignUp.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: '',
    zipCode: '',
    password: '',
  }); 

  const [passwordConfirm, setPasswordConfirm] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchFormSubmit = async (event: any): Promise<void> => {

    event.preventDefault();

    if (!user.password || !user.zipCode || !user.userName) {
        throw new Error('Please fill out all values, values cannot be blank');
    }

    if (user.password  !== passwordConfirm) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage(''); //reset error message if matching

    //fetch to api routes, hit the routes that updates the database to the user
    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });



      if (!response.ok) {
        const errorData = await response.json(); // Get the error response body
        console.error("Failed to sign up", errorData);
        throw new Error("Failed to sign up");
      }

      const result = await response.json();
      console.log("User successfully signed up:", result);

      localStorage.setItem("token", result.token);

      navigate('/home');


      
    } catch (error) {
      console.error("Error: User failed to signed up");
    }
  };

  //this will handle all the inputs and store them into user state change and return back values, event click or change, target is element interacted with
  // runs every time the type 
  const handleInputChange = async (event: any): Promise<void> =>{
    
    //consoles in readtime inputs being updated
    console.log(event.target.value);

    //if we are setting passwordConfirm then setPasswordConfirm with the value of passwordConfirm string else set the objects individually
    if(event.target.name === 'confirmPassword'){
      setPasswordConfirm(event.target.value)
    }else{
      setUser({...user, [event.target.name]:event.target.value})
      //setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  }

    return (
      <> 
        <h1 className="signup-header">Sign Up and Never Miss Out</h1>
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

        <Field label="Confirm Password" >
          <Input name="confirmPassword" onChange={handleInputChange} value={passwordConfirm} type="password" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Field>
      
      </Fieldset.Content>

      <Button onClick={handleSearchFormSubmit} name="submit" type="submit" alignSelf="flex-start">
        Sign Up
      </Button>
    </Fieldset.Root>
        </form>
        </div>
      </>
 
  
    )
};

export default SignUp;