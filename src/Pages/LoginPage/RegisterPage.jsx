import EmailInput from "./Input Components/EmailInput";
import PasswordInput from "./Input Components/PasswordInput";
import { Button, Container, Text, Link, Box } from "@chakra-ui/react";
import UsernameInput from "./Input Components/UsernameInput";

function RegisterPage() {
  return (
    <Container centerConten mt="70px" centerContent>
      <Container
        bg="gray.50"
        borderRadius="50px"
        centerContent
        boxShadow="dark-lg"
      >
        <Text fontSize={30} mt="20px">
          Sign Up
        </Text>
        <UsernameInput />
        <EmailInput />
        <PasswordInput />
        <Button
          colorScheme="yellow"
          mt="25px"
          mb="25px"
          width="75%"
          borderRadius="30px"
        >
          Create your account
        </Button>
      </Container>
      <Text mt="20px" fontSize="16px">
        Already have an account?{"     "}
        <Link color="#ffa460" fontWeight="bold">
          Log In
        </Link>
      </Text>
    </Container>
  );
}

export default RegisterPage;
