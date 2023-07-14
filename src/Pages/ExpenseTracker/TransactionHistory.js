import {
  Flex,
  Button,
  Heading,
  Box,
  Icon,
  Input,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";
import ColorSetter from "./ColorSetter";
import { toast } from 'react-toastify';

function TransactionHistory({
  transactionHistory,
  setTransactionHistory,
  filteredTxn,
  setFilteredTxn,
}) {
  const [searchText, setSearchText] = useState("");

  function FilterWeek() {
    let txn = [...transactionHistory];
    const currentDate = new Date();
    const oneWeekAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    ); // Subtract 7 days in milliseconds
    txn = txn.filter(
      (trans) =>
        // Check if the transaction date is within the past week
        new Date(trans.date) >= oneWeekAgo
    );
    setFilteredTxn(txn);
  }

  function FilterMonth() {
    let txn = [...transactionHistory];
    const currentDate = new Date();
    const oneMonthAgo = new Date(
      currentDate.getTime() - 30 * 7 * 24 * 60 * 60 * 1000
    ); // Subtract 30 days in milliseconds
    txn = txn.filter(
      (trans) =>
        // Check if the transaction date is within the past week
        new Date(trans.date) >= oneMonthAgo
    );
    setFilteredTxn(txn);
  }

  function NoFilter() {
    setFilteredTxn([...transactionHistory]);
  }

  //to update cells when search bar is used
  function FilterData(searchText) {
    let txnOriginal = [...transactionHistory];
    if (!searchText || !searchText.trim().length) {
      setFilteredTxn(transactionHistory);
      return;
    }

    let txn = [...filteredTxn];
    txn = txn.filter((trans) =>
      trans.description.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    setFilteredTxn(txn);
  }
  useEffect(() => FilterData(searchText), [searchText, transactionHistory]);

  return (
    <Flex direction="column" py="6" justify="center">
      <Container width="150%">
        <Heading py="3" align="center">
          History
        </Heading>
        <Button
          bg="#ffcc80"
          size="xs"
          mb="10px"
          mr="5px"
          _hover={{ bg: "#ffd8a8" }}
          _active={{ bg: "#ffa94d" }}
          onClick={FilterWeek}
        >
          Week
        </Button>
        <Button
          bg="#ffcc80"
          size="xs"
          mb="10px"
          mr="5px"
          _hover={{ bg: "#ffd8a8" }}
          _active={{ bg: "#ffa94d" }}
          onClick={FilterMonth}
        >
          Month
        </Button>
        <Button
          bg="#ffcc80"
          size="xs"
          mb="10px"
          _hover={{ bg: "#ffd8a8" }}
          _active={{ bg: "#ffa94d" }}
          onClick={NoFilter}
        >
          All
        </Button>
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            FilterData(e.target.value);
          }}
        ></Input>
        <Box maxH="310px" overflow="overlay" mt="2px">
          {filteredTxn.map(
            (transaction) =>
              transaction && (
                <TransactionCell
                  key={transaction.id}
                  transaction={transaction}
                  transactionHistory={transactionHistory}
                  setTransactionHistory={setTransactionHistory}
                  transactionId={transaction.id}
                />
              )
          )}
        </Box>
      </Container>
    </Flex>
  );
}

function TransactionCell({
  transaction,
  setTransactionHistory,
  transactionHistory,
  transactionId,
}) {
  const color = ColorSetter({ transaction });
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const tid = transactionId;
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/transactions/" +
          tid,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      toast.success("Deleted transaction successfully!");

      const updatedHistory = transactionHistory.filter(
        (item) => item.id !== transaction.id
      );
      setTransactionHistory(updatedHistory);
    } catch (err) {
      console.log(err);
      toast.error("Deleting transaction failed!");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Flex justify="space-between" bg="gray.50" py="2">
      <Box
        p={1}
        borderLeftWidth={6}
        borderLeftColor={color}
        borderLeftRadius={1}
        width="100%"
        fontSize="20px"
        fontWeight="bold"
        display="flex"
        alignItems="center"
      >
        {transaction.description ?? ""}
        <Spacer />${transaction.amount ?? ""}
        <Box ml="auto">
          {!deleting && (
            <Button
              colorScheme="gray"
              bg="gray.50"
              mr="5px"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Icon as={FiTrash2} />
            </Button>
          )}

          {deleting && (
            <Button
              bg="transparent"
              mr="5px"
              cursor="default"
              _hover={{ backgroundColor: "transparent" }}
            >
              <Icon as={LuLoader2} />
            </Button>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default TransactionHistory;
