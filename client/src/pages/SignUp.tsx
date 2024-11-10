import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlineTeal from "../images/alineteal.webp";
import { Box } from "@chakra-ui/react";

const SignUp = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [user, setUser] = useState({
    userName: '',
    zipCode: '',
    password: '',
  });

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchFormSubmit = async (event: any): Promise<void> => {
    event.preventDefault();

    // Check for empty fields
    if (!user.userName || !user.zipCode || !user.password || !passwordConfirm) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    // Check if passwords match
    if (user.password !== passwordConfirm) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage(''); // Reset error message if all validations pass

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to sign up", errorData);
        throw new Error("Failed to sign up");
      }

      const result = await response.json();
      console.log("User successfully signed up:", result);

      localStorage.setItem("token", result.token);
      localStorage.setItem("firstSignUp", "true");

      navigate('/home');
    } catch (error) {
      console.error("Error: User failed to sign up");
    }
  };

  const handleInputChange = (event: any): void => {
    if (event.target.name === 'confirmPassword') {
      setPasswordConfirm(event.target.value);
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };

  return (
    <>
     <Box bg="black" className="dark"
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh" 
            bgGradient="linear(to-r, gray.50, teal.100)"
            p={4}
        >
      <img src={AlineTeal} alt="Aline Header" style={{ height: '200px', display: 'block', margin: '0 auto' }} />
      <h1 className="signup-header">Sign Up and Never Miss Out</h1>
      <div className="form-container">
        <form>
          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>Contact details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details below.<br></br>
                <span className="required">* Required</span>
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field label={<><span className="required">*</span> User Name</>}>
                <Input name="userName" onChange={handleInputChange} value={user.userName} />
              </Field>

              <Field label={<><span className="required">*</span> Zip Code</>}>
                <Input name="zipCode" onChange={handleInputChange} value={user.zipCode} />
              </Field>

              <Field label={<><span className="required">*</span> Password</>}>
                <Input name="password" type="password" onChange={handleInputChange} value={user.password} />
              </Field>

              <Field label={<><span className="required">*</span> Confirm Password</>}>
                <Input name="confirmPassword" onChange={handleInputChange} value={passwordConfirm} type="password" />
              </Field>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Fieldset.Content>

            <Stack direction="row" mt={4}>
              <Button onClick={handleSearchFormSubmit} name="submit" type="submit">
                Sign Up
              </Button>
              <Button className="back-button3" onClick={handleBack}>
                Cancel
              </Button>
            </Stack>
          </Fieldset.Root>
        </form>
      </div>
      </Box>
    </>
  );
};

export default SignUp;
