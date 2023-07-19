import { Container, Text, SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import Labels from "./Labels";
import TransactionInput from "./TransactionInput";
import TransactionHistory from "./TransactionHistory";
import { useEffect, useState } from "react";
import DoughnutGraph from "./DoughnutGraph";
import ProgressBar from "../BudgetPage/ProgressBar";

function FinanceTrackerPage({
  transactionHistory,
  setTransactionHistory,
  budget,
  setBudget,
}) {
  const [graphData, setGraphData] = useState([]);
  const [filteredTxn, setFilteredTxn] = useState(transactionHistory);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const uid = sessionStorage.getItem("userId");
        const response = await fetch(
          "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/" +
            uid +
            "/getBudget",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        setBudget(responseData.monthlyBudget);
        // console.log(responseData.monthlyBudget);
      } catch (err) {
        console.log(err);
        alert("Receiving budget failed!");
      }
    };
    fetchBudget();
  }, []);

  useEffect(() => {
    let data = [0, 0, 0, 0, 0, 0, 0];
    filteredTxn.forEach((transaction) => {
      switch (transaction.category) {
        case "Food":
          data[0] += transaction.amount;
          data[6] += transaction.amount;
          break;
        case "Gifts":
          data[1] += transaction.amount;
          data[6] += transaction.amount;
          break;
        case "Transport":
          data[2] += transaction.amount;
          data[6] += transaction.amount;
          break;
        case "Bills":
          data[3] += transaction.amount;
          data[6] += transaction.amount;
          break;
        case "Entertainment":
          data[4] += transaction.amount;
          data[6] += transaction.amount;
          break;
        default:
          data[5] += transaction.amount;
          data[6] += transaction.amount;
          break;
      }
    });
    setGraphData(data);
  }, [filteredTxn]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const uid = sessionStorage.getItem("userId");
        const response = await fetch(
          "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/transactions/user/" +
            uid,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        setTransactionHistory(responseData.transactions);
      } catch (err) {
        console.log(err);
        alert("Receiving transaction failed!");
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to trigger the effect only once

  return (
    <>
      <SimpleGrid
        ml="5%"
        justify="center"
        columns={4}
        spacing={50}
        overflowX="scrollable"
        minHeight="830px"
      >
        <GridItem colSpan="1"></GridItem>

        <GridItem
          m="20px"
          centerContent
          mt="50px"
          minW="600px"
          ml="-300px"
          overflowX="hidden"
        >
          <Container centerContent>
            <DoughnutGraph graphData={graphData}></DoughnutGraph>
            {budget != 0 ? (
              <>
                <Text fontSize="4xl" position="absolute" bottom="65%">
                  Total
                </Text>
                <Text
                  fontSize="5xl"
                  position="absolute"
                  bottom="60%"
                  color="green.300"
                  fontWeight="bold"
                >
                  ${graphData[6]}
                </Text>
              </>
            ) : (
              <>
                <Text fontSize="4xl" position="absolute" bottom="58%">
                  Total
                </Text>
                <Text
                  fontSize="5xl"
                  position="absolute"
                  bottom="53%"
                  color="green.300"
                  fontWeight="bold"
                >
                  ${graphData[6]}
                </Text>
              </>
            )}
          </Container>
          <Box ml="12%" w="80%">
            <Labels graphData={graphData}></Labels>
          </Box>
        </GridItem>
        <GridItem m="20px" justify="center" spacing={30}>
          <TransactionInput
            setTransactionHistory={setTransactionHistory}
            transactionHistory={transactionHistory}
          ></TransactionInput>
          <TransactionHistory
            transactionHistory={transactionHistory}
            setTransactionHistory={setTransactionHistory}
            filteredTxn={filteredTxn}
            setFilteredTxn={setFilteredTxn}
          />
        </GridItem>

        <GridItem colSpan="1"></GridItem>
      </SimpleGrid>
      <ProgressBar
        budget={budget}
        transactionHistory={transactionHistory}
      ></ProgressBar>
    </>
  );
}

export default FinanceTrackerPage;
