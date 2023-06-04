import EmailInput from "./Input Components/EmailInput";
import PasswordInput from "./Input Components/PasswordInput";
import { Button, Container, Text, Link, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function LoginPage({ setLoggedin, setUserId }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  // const [token, setUserId] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
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
      console.log(responseData);
      alert("logged in successful");
      // const value = true;
      setUserId(responseData.userId);
      alert(responseData.userId);
      setLoggedin(true);
      // console.log(userId);
      navigate("/");
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

LoginPage.propTypes = {
  setUserId: PropTypes.func.isRequired,
};

export default LoginPage;
