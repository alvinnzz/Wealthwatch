import { Grid, Container, Text, Center, SimpleGrid } from "@chakra-ui/react";
import Labels from "./Labels";
import TransactionInput from "./TransactionInput";
import NavBar from "../navbar/NavBar";
import TipGenerator from "../TipGenerator";
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
      <SimpleGrid ml="5%" justify="center" columns={2} spacing={5}>
        <Container m="20px" centerContent>
          <DoughnutGraph graphData={graphData}></DoughnutGraph>
          <Center>
            <Text fontSize="2xl" position="absolute" top="38%">
              Total
              <Text
                fontSize="4xl"
                position="absolute"
                top="130%" // Adjust the vertical position as needed
                left="50%" // Center the text horizontally
                transform="translate(-50%, -50%)" // Center the text both vertically and horizontally
                color="green.300"
                fontWeight="bold"
              >
                ${graphData[6]}
              </Text>
            </Text>
          </Center>

          <Labels graphData={graphData}></Labels>
        </Container>
        <Container m="20px" justify="center">
          <TransactionInput
            setTransactionHistory={setTransactionHistory}
            transactionHistory={transactionHistory}
          ></TransactionInput>
          <TransactionHistory
            transactionHistory={transactionHistory}
            setTransactionHistory={setTransactionHistory}
          />
        </Container>
      </SimpleGrid>
    </>
  );
}

export default FinanceTrackerPage;
