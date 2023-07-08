import { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";

const BudgetPage = ({ setBudget, budget, transactionHistory }) => {
  //   const handleBudgetChange = (event, category) => {
  //     const { value } = event.target;
  //     setBudget((prevBudget) => ({
  //       ...prevBudget,
  //       [category]: parseFloat(value),
  //     }));
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // You can perform any additional logic here, like sending the data to a server
      const { value } = event.target.elements.budgetInput;
      if (value < 0) {
        throw new Error("Budget should not be lesser than 0!");
      }
      setBudget(value);
      console.log("Submitted budgets:", value);
      const uid = sessionStorage.getItem("userId");
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/" + uid + "/editBudget",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            monthlyBudget: value
          }),
        }
      );

      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      console.log("Editted budget successfully!");
      // Reset the budgetInput field after successful submission
      event.target.elements.budgetInput.value = '';
    } catch (err) {
      console.log(err);
      alert("Editting budget failed!");
    }
  };

  return (
    <Box p={4}>
      <Center fontSize="30px">Budget</Center>

      {budget === 0 ? (
        <>
          <Center my="2%">
            <Text>
              Add a budget to your account to keep track of your spending so
              that you can better hit your goals
            </Text>
          </Center>
        </>
      ) : (
        <ProgressBar
          budget={budget}
          transactionHistory={transactionHistory}
        ></ProgressBar>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={4} my="2%" align="center">
          <Center w="40%">
            <FormControl>
              <FormLabel>Monthly budget</FormLabel>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter monthly budget"
                name="budgetInput"
              />
            </FormControl>
          </Center>

          <Button
            type="submit"
            bg="#ffcc80"
            w="40%"
            _hover={{ bg: "#ffd8a8" }}
            _active={{ bg: "#ffa94d" }}
          >
            Save Budget
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BudgetPage;
