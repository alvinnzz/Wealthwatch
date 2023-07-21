import EmailInput from "./Input_Components/EmailInput";
import PasswordInput from "./Input_Components/PasswordInput";
import { Button, Container, Text, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage({ setToken }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const responseData = await response.json();
      if (
        responseData.error === "Login failed: Email not found!" ||
        responseData.error === "Login failed: Wrong Password!"
      ) {
        //alert("Login failed: Email not found!");
        setInvalidCredentials(true);
      } else if (responseData.hasOwnProperty("error")) {
        alert(responseData.error);
      } else {
        sessionStorage.setItem("token", responseData.token);
        sessionStorage.setItem("userId", responseData.userId);
        setToken(responseData.token);
        toast.success("Login successfully!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      console.log(err);
      // alert("login failed");
      setInvalidCredentials(true);
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
        <EmailInput setEmail={setEmail} />
        <PasswordInput
          setPassword={setPassword}
          invalidCredentials={invalidCredentials}
        />
        {invalidCredentials && (
          <Text color="red.800" data-testid="incorrectlogincredentials">
            The email or password you entered is incorrect.
          </Text>
        )}
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
          onClick={() => {
            setInvalidCredentials(false);
            window.location = "/register";
          }}
        >
          Sign Up
        </Link>
      </Text>
    </Container>
  );
}

export default LoginPage;
