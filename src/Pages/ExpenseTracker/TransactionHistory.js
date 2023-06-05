import { Flex, Button, Heading, Box, Icon, Spacer } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
const obj = [
  {
    category: "Savings",
    color: "#f9c74f",
  },
  {
    category: "Expense",
    color: "#f9c74f",
  },
  { category: "Investment", color: "#f9c74f" },
];

function TransactionHistory() {
  return (
    <Flex direction="column" py="6" justify="center">
      <Heading py="3" align="center">
        History
      </Heading>
      {obj.map((v, i) => (
        <Transaction color={i} category={v} />
      ))}
    </Flex>
  );
}

function Transaction({ category }) {
  if (!category) {
    return null;
  } else {
    return (
      <Flex justify="space-between" bg="gray.50" py="2">
        <Box
          p={1}
          borderLeftWidth={5}
          borderLeftColor={category.color ?? "#f9c7df"}
          borderLeftRadius={1}
          width="100%"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          {category.category ?? ""}
          <Spacer />
          <Button colorScheme="gray" bg="gray.50" mr="5px">
            <Icon as={FiTrash2} />
          </Button>
        </Box>
      </Flex>
    );
  }
}

export default TransactionHistory;
