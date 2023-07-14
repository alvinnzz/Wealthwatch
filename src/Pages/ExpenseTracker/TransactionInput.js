import {
  Heading,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  Container,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { toast } from 'react-toastify';

function TransactionInput({ transactionHistory, setTransactionHistory }) {
  const { register, resetField } = useForm();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState(false);

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

  const handleDateChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setDate(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/transactions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: description,
            category: category,
            amount: amount,
            date: date,
            creator: sessionStorage.getItem("userId"),
          }),
        }
      );

      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      let temp = transactionHistory;
      temp.unshift(responseData.transaction);
      setTransactionHistory(temp);
      // alert("Added transaction successfully!");
      // Reset the input fields
      resetField("category");
      resetField("description");
      resetField("amount");
      resetField("date");
      setError(false);   
      toast.success("Added transaction successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (err) {
      console.log(err);
      // alert("Adding transaction failed!");
      setError(true);
      toast.error("Adding transaction failed!");
    }
  };

  return (
    <Box ml="15%">
      <Center fontSize="25px" fontWeight="bold" width="150%">
        Transaction
      </Center>
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
          <Input
            mt="5px"
            size="md"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
              mt="5px"
            />

            {error ? (
              <Box>
                <Input
                  {...register("amount")}
                  placeholder="   Amount"
                  mt="5px"
                  onChange={handleAmountChange}
                  borderColor="red.600"
                  _hover={{ borderColor: "red.300" }}
                  _focus={{ borderColor: "red.300" }}
                />
                <Text fontSize="13px" color="red.800">
                  Invalid transaction entered. Ensure each field is filled in.
                </Text>
              </Box>
            ) : (
              <Input
                {...register("amount")}
                placeholder="Amount"
                mt="5px"
                onChange={handleAmountChange}
              />
            )}
          </InputGroup>
          <Button mt="20px" type="submit" width="100%" bg="#ffcc90">
            Add transaction
          </Button>
        </Container>
      </form>
    </Box>
  );
}

export default TransactionInput;
