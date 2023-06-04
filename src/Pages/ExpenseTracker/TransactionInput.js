import {
  Heading,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  Container,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TransactionHistory from "./TransactionHistory";
import axios from "axios";

function TransactionInput() {
  const { register, handleSubmit, resetField } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5001/api/transactions", data)
      .then((response) => {
        console.log(response.data); // handle the response from the backend
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const onSubmit = async (data) => {
  //   data.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:5001/api/users/api/transactions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });

  //     const responseData = await response.json();
  //     console.log(responseData);
  //     alert("logged in successful");
  //     // const value = true;
  //     setLoggedin(true);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //     alert("login failed");
  //   }
  // };

  return (
    <Box>
      <Heading align="center">Transaction</Heading>
      <form id="form" align="center" onSubmit={handleSubmit(onSubmit)}>
        <Container width="150%">
          <Select
            placeholder="Select option"
            mt="20px"
            {...register("category")}
          >
            <option value="Food">Food</option>
            <option value="Gifts">Gifts</option>
            <option value="Transport">Transport</option>
            <option value="Others">Others</option>
          </Select>
          <Input
            {...register("description")}
            placeholder="Description"
            mt="5px"
          />
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
              mt="5px"
              ml="5px"
            />
            <Input {...register("amount")} placeholder="Amount" mt="5px" />
          </InputGroup>
          <Button mt="20px" type="submit" width="100%" bg="#ffcc90">
            Add transaction
          </Button>
        </Container>
      </form>
      <TransactionHistory />
    </Box>
  );
}

export default TransactionInput;
