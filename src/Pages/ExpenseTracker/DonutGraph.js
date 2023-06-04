import { Grid, Container, Text, Center, SimpleGrid } from "@chakra-ui/react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";
import TransactionInput from "./TransactionInput";
import NavBar from "../navbar/NavBar";

Chart.register(ArcElement);

const config = {
  data: {
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        borderRadius: 30,
        spacing: 10,
        borderwidth: 5,
      },
    ],
  },
  options: {
    cutout: 180,
  },
};

function DonutGraph() {
  return (
    <>
      <SimpleGrid ml="5%" justify="center" columns={2} spacing={5}>
        <Container m="20px" centerContent>
          <Doughnut {...config}></Doughnut>
          <Text fontSize="2xl" position="absolute" top="45%">
            Total
            <Text
              fontSize="4xl"
              position="absolute"
              top="60%"
              left="7%"
              color="green.300"
              fontWeight="bold"
            >
              ${0}
            </Text>
          </Text>
          <Labels></Labels>
        </Container>
        <Container m="20px" justify="center">
          <TransactionInput></TransactionInput>
        </Container>
      </SimpleGrid>
    </>
  );
}

export default DonutGraph;
