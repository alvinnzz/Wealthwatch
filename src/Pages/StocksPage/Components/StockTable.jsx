import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Icon,
} from "@chakra-ui/react";
import { FcBullish, FcBearish } from "react-icons/fc";
import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

function StockTable() {
  const [stock, setStock] = useState([]);
  const { watchList, deleteStock } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        const data = responses.map((response) => {
          return { data: response.data, symbol: response.config.params.symbol };
        });
        // alert(responses);

        isMounted && setStock(data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();

    return () => (isMounted = false);
  }, [watchList]);

  const handleStockSelection = (symbol) => {
    navigate(`/stockdetails/${symbol}`);
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Stocks Watchlist</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Last</Th>
            <Th>Chg</Th>
            <Th>Chg%</Th>
            <Th>High</Th>
            <Th>Low</Th>
            <Th>Open</Th>
            <Th>Pclose</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stock.map((stockData) => {
            return (
              <Tr
                cursor="pointer"
                key={stockData.symbol}
                onClick={() => handleStockSelection(stockData.symbol)}
                _hover={{ backgroundColor: "gray.100" }}
              >
                <Td fontWeight="bold">{stockData.symbol}</Td>
                <Td>{stockData.data.c}</Td>
                {stockData.data.d >= 0 ? (
                  <Td color="green">
                    ${stockData.data.d}{" "}
                    <Icon
                      as={FcBullish}
                      style={{
                        transform: "translateY(3px)",
                        fontSize: "1.2em",
                      }}
                    />
                  </Td>
                ) : (
                  <Td color="red">
                    ${stockData.data.d}{" "}
                    <Icon
                      as={FcBearish}
                      style={{
                        transform: "translateY(3px)",
                        fontSize: "1.2em",
                      }}
                    />
                  </Td>
                )}

                {stockData.data.d >= 0 ? (
                  <Td color="green">
                    {stockData.data.dp}{" "}
                    <Icon
                      as={FcBullish}
                      style={{
                        transform: "translateY(3px)",
                        fontSize: "1.2em",
                      }}
                    />
                  </Td>
                ) : (
                  <Td color="red">
                    {stockData.data.dp}{" "}
                    <Icon
                      as={FcBearish}
                      style={{
                        transform: "translateY(3px)",
                        fontSize: "1.2em",
                      }}
                    />
                  </Td>
                )}

                <Td>{stockData.data.h}</Td>
                <Td>{stockData.data.l}</Td>
                <Td>{stockData.data.o}</Td>
                <Td>{stockData.data.pc}</Td>
                <Td padding="0" ml="-30px" pl="-10px">
                  <Button
                    bg="transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStock(stockData.symbol);
                    }}
                  >
                    <Icon as={FiTrash2} />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default StockTable;
