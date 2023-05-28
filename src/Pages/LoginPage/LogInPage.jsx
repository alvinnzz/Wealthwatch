import EmailInput from "./Input Components/EmailInput";
import PasswordInput from "./Input Components/PasswordInput";
import { Button, Container, Text, Link, Box } from "@chakra-ui/react";

function LoginPage() {
  return (
    <Container centerConten mt="70px" centerContent>
      <Container
        bg="gray.50"
        borderRadius="50px"
        centerContent
        boxShadow="dark-lg"
      >
        <Text fontSize={30} mt="20px">
          Sign In
        </Text>
        <EmailInput />
        <PasswordInput />
        <Button
          colorScheme="yellow"
          mt="25px"
          mb="25px"
          width="75%"
          borderRadius="30px"
        >
          Sign In
        </Button>
      </Container>
      <Text mt="20px" fontSize="16px">
        New to WealthWatch?{"     "}
        <Link
          color="#ffa460"
          fontWeight="bold"
          onClick={() => (window.location.href = "/register")}
        >
          Sign Up
        </Link>
      </Text>
    </Container>
  );
}
export default LoginPage;
