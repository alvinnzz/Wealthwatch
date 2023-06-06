import {
  Flex,
  Button,
  Heading,
  Box,
  Icon,
  Spacer,
  Input,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";
import ColorSetter from "./ColorSetter";

function TransactionHistory({ transactionHistory, setTransactionHistory }) {
  const [searchText, setSearchText] = useState("");
  const [filteredTxn, setFilteredTxn] = useState(transactionHistory);

  //to update cells when search bar is used
  function FilterData(searchText) {
    if (!searchText || !searchText.trim().length) {
      setFilteredTxn(transactionHistory);
      return;
    }

    let txn = [...transactionHistory];
    txn = txn.filter((trans) =>
      trans.description.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    setFilteredTxn(txn);
  }
  useEffect(() => FilterData(searchText), [searchText, transactionHistory]);

  return (
    <Flex direction="column" py="6" justify="center">
      <Heading py="3" align="center">
        History
      </Heading>
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
                transaction={transaction}
                transactionHistory={transactionHistory}
                setTransactionHistory={setTransactionHistory}
                transactionId={transaction.id}
              />
            )
        )}
      </Box>
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
        "http://localhost:5001/api/transactions/" + tid,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      alert("Deleted transaction successfully!");

      const updatedHistory = transactionHistory.filter(
        (item) => item.id !== transaction.id
      );
      setTransactionHistory(updatedHistory);
    } catch (err) {
      console.log(err);
      alert("Deleting transaction failed!");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Flex justify="space-between" bg="gray.50" py="2">
      <Box
        p={1}
        borderLeftWidth={5}
        borderLeftColor={color}
        borderLeftRadius={1}
        width="100%"
        fontWeight="bold"
        display="flex"
        alignItems="center"
      >
        {transaction.description ?? ""}
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
