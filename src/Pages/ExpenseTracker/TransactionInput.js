import {
  Heading,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  Container,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TransactionHistory from "./TransactionHistory";
import React, { useState } from "react";
import axios from "axios";

function TransactionInput({ transactionHistory, setTransactionHistory }) {
  const { register, handleSubmit, resetField } = useForm();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const history = transactionHistory;

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };
  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          category: category,
          amount: amount,
          creator: sessionStorage.getItem("userId"),
        }),
      });

      const responseData = await response.json();

      let temp = history;
      temp.unshift(responseData.transaction);
      setTransactionHistory(temp);
      console.log(transactionHistory);

      alert("Added transaction successfully!");
      // Reset the input fields
      resetField("category");
      resetField("description");
      resetField("amount");
    } catch (err) {
      console.log(err);
      alert("Adding transaction failed!");
    }
  };

  return (
    <Box>
      <Heading align="center">Transaction</Heading>
      <form id="form" align="center" onSubmit={submitHandler}>
        <Container width="150%">
          <Select
            placeholder="Select option"
            mt="20px"
            {...register("category")}
            onChange={handleCategoryChange}
          >
            <option value="Food">Food</option>
            <option value="Gifts">Gifts</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transport">Transport</option>
            <option value="Others">Others</option>
          </Select>
          <Input
            {...register("description")}
            placeholder="Description"
            mt="5px"
            onChange={handleDescriptionChange}
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
            <Input
              {...register("amount")}
              placeholder="Amount"
              mt="5px"
              onChange={handleAmountChange}
              type="number"
            />
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
