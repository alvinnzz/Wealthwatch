import EmailInput from "./Input_Components/EmailInput";
import PasswordInput from "./Input_Components/PasswordInput";
import { Button, Container, Text, Link, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setToken }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();
      alert("logged in successful");
      sessionStorage.setItem("token", responseData.token);
      sessionStorage.setItem("userId", responseData.userId);
      setToken(responseData.token);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(err);
      alert("login failed");
    }
  };

  return (
    <Container mt="70px" centerContent>
      <Container
        bg="gray.50"
        borderRadius="50px"
        centerContent
        boxShadow="dark-lg"
      >
        <Text fontSize={30} mt="20px">
          Sign In
        </Text>
        <EmailInput setEmail={setEmail} setError={setError} />
        <PasswordInput setPassword={setPassword} />
        <Button
          colorScheme="yellow"
          mt="25px"
          mb="25px"
          width="75%"
          borderRadius="30px"
          onClick={loginHandler}
        >
          Sign In
        </Button>
      </Container>
      <Text mt="20px" fontSize="16px">
        New to WealthWatch?{"     "}
        <Link
          color="#ffa460"
          fontWeight="bold"
          onClick={() => (window.location = "/register")}
        >
          Sign Up
        </Link>
      </Text>
    </Container>
  );
}

export default LoginPage;
