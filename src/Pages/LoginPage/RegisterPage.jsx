import EmailInput from "./Input Components/EmailInput";
import PasswordInput from "./Input Components/PasswordInput";
import { Button, Container, Text, Link } from "@chakra-ui/react";
import UsernameInput from "./Input Components/UsernameInput";
import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();
      if (responseData === "signup failed: email taken") {
        alert("Sign up failed: Email taken");
      } else {
        window.location = "/login";
      }
      console.log(responseData);
    } catch (err) {
      alert(err);
      console.log(err);
      // alert("Email taken. Please try another email.");
    }
  };

  function isValidEmail(email) {
    var result = /\S+@\S+\.\S+/.test(email);
    if (!result) {
      setError("Invalid email entered. Please enter a valid email.");
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
        <PasswordInput setPassword={setPassword} />
        <Button
          colorScheme="yellow"
          mt="25px"
          mb="25px"
          width="75%"
          borderRadius="30px"
          onClick={(event) =>
            isValidEmail(email) ? signUpHandler(event) : alert(error)
          }
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
