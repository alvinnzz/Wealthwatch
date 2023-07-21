import EmailInput from "./Input_Components/EmailInput";
import PasswordInput from "./Input_Components/PasswordInput";
import { Button, Container, Text, Link } from "@chakra-ui/react";
import UsernameInput from "./Input_Components/UsernameInput";
import { useState } from "react";
import { toast } from "react-toastify";

function RegisterPage() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );

      const responseData = await response.json();
      if (responseData.error === "Sign up failed: Email taken") {
        setError("Sign up failed: Email taken");
        setInvalidCredentials(true);
        toast.error("Sign up failed: Email taken");
      } else if (responseData.hasOwnProperty("error")) {
        alert(responseData.error);
      } else {
        toast.success("Signed up successfully!");
        setTimeout(() => {
          window.location = "/login";
        }, 2000);
      }
      console.log(responseData);
    } catch (err) {
      setInvalidCredentials(true);
      console.log(err);
      // alert("Email taken. Please try another email.");
    }
  };

  function isValidEmail(email) {
    var result = /\S+@\S+\.\S+/.test(email);
    if (!result) {
      setError("Invalid email entered. Please enter a valid email.");
      setInvalidCredentials(true);
    }
    return result;
  }

  return (
    <Container mt="70px" centerContent>
      <Container
        bg="gray.50"
        borderRadius="50px"
        centerContent
        boxShadow="dark-lg"
      >
        <Text fontSize={30} mt="20px">
          Sign Up
        </Text>
        <UsernameInput setUsername={setUsername} />
        <EmailInput setEmail={setEmail} />
        <PasswordInput
          setPassword={setPassword}
          invalidCredentials={invalidCredentials}
        />
        <Text color="red.800" data-testid="emailtaken">
          {error}
        </Text>
        <Button
          colorScheme="yellow"
          mt="25px"
          mb="25px"
          width="75%"
          borderRadius="30px"
          onClick={(event) => isValidEmail(email) && signUpHandler(event)}
        >
          Create your account
        </Button>
      </Container>
      <Text mt="20px" fontSize="16px">
        Already have an account?{"     "}
        <Link
          color="#ffa460"
          fontWeight="bold"
          onClick={() => (window.location = "/login")}
        >
          Log In
        </Link>
      </Text>
    </Container>
  );
}

export default RegisterPage;
