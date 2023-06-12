import { Container, Text, SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import Labels from "./Labels";
import TransactionInput from "./TransactionInput";
import TransactionHistory from "./TransactionHistory";
import { useEffect, useState } from "react";
import DoughnutGraph from "./DoughnutGraph";

function FinanceTrackerPage({ transactionHistory, setTransactionHistory }) {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    let data = [0, 0, 0, 0, 0, 0, 0];
    transactionHistory.forEach((transaction) => {
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
  }, [transactionHistory]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const uid = sessionStorage.getItem("userId");
        const response = await fetch(
          "http://localhost:5001/api/transactions/user/" + uid,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
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
      >
        <GridItem colSpan="1"></GridItem>

        <GridItem m="20px" centerContent mt="50px" minW="600px" ml="-300px">
          <Container centerContent>
            <DoughnutGraph graphData={graphData}></DoughnutGraph>

            <Text fontSize="4xl" position="absolute" bottom="56%">
              Total
            </Text>
            <Text
              fontSize="5xl"
              position="absolute"
              bottom="50%"
              color="green.300"
              fontWeight="bold"
            >
              ${graphData[6]}
            </Text>
          </Container>
          <Box ml="12%" w="75%">
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
          />
        </GridItem>

        <GridItem colSpan="1"></GridItem>
      </SimpleGrid>
    </>
  );
}

export default FinanceTrackerPage;
