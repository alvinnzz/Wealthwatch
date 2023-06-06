import TipGenerator from "../TipGenerator";
import NavBar from "../navbar/NavBar";
import DonutGraph from "../../Resources/DonutGraph.png";
import StockChart from "../../Resources/StockChart.png";
import StockPrices from "../../Resources/StockPrices.png";

import {
  Button,
  ButtonGroup,
  Box,
  Container,
  Center,
  Text,
  Grid,
  GridItem,
  SimpleGrid,
  Spacer,
  Heading,
  Img,
} from "@chakra-ui/react";

function HomePage({ userId }) {
  return (
    <Grid templateColumns="repeat(2,1fr)">
      <GridItem colSpan="1">
        <Box
          minH="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="395px"
        >
          <Box textAlign="center" flexDirection="column">
            <Heading as="h2" size="md" fontWeight="bold" mb={2} fontSize="30px">
              One Graph, Complete Picture
            </Heading>
            <Text fontSize="20px">
              Leverage on our graphical representations to gain{" "}
            </Text>
            <Text fontSize="20px">
              a clearer picture of your spending habits to better plan your
              finances!
            </Text>
          </Box>
        </Box>
        <Box
          minH="200px"
          h="395px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
        >
          <Img
            src={StockPrices}
            alt="StockPrices"
            style={{ maxWidth: "800px", maxHeight: "395px" }}
          ></Img>
        </Box>
        <Box
          minH="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="395px"
        >
          <Box textAlign="center" flexDirection="column">
            <Heading as="h2" size="md" fontWeight="bold" mb={2} fontSize="30px">
              Convenience without compromise
            </Heading>
            <Text fontSize="20px">
              Maximise our in site stock analysis tools which allows you{" "}
            </Text>
            <Text fontSize="20px">
              to zoom in on certain portions of the day to better analyse your
              buy and
            </Text>
          </Box>
        </Box>
        <Box minH="200px">
          <TipGenerator></TipGenerator>
        </Box>
      </GridItem>
      <GridItem colSpan="1">
        <Box
          minH="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
        >
          <img
            src={DonutGraph}
            alt="donutgraph"
            style={{ maxWidth: "400px", maxHeight: "395px" }}
          />
        </Box>
        <Box
          minH="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="395px"
        >
          <Box textAlign="center" flexDirection="column">
            <Heading as="h2" size="md" fontWeight="bold" mb={2} fontSize="30px">
              Convenience served to you
            </Heading>
            <Text fontSize="20px">
              Reduce your time spent searching with our in-site stock prices,
            </Text>
            <Text fontSize="20px">
              retrieved every 15 minutes to give you the most up to date prices
              of your stocks.
            </Text>
          </Box>
        </Box>
        <Box
          minH="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
        >
          <img
            src={StockChart}
            alt="StockChart"
            style={{ maxWidth: "600px", maxHeight: "390px" }}
          />
        </Box>
        <Box
          minH="272px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box textAlign="center" flexDirection="column">
            <Heading as="h2" size="md" fontWeight="bold" mb={2} fontSize="30px">
              Learn with just a click of a button
            </Heading>
            <Text fontSize="20px">
              Utilize our specially made tip generator to learn new ways to{" "}
            </Text>
            <Text fontSize="20px">
              {" "}
              save money. All you have to do is click on the button. Try it, it
              wont cost you a cent.
            </Text>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default HomePage;
