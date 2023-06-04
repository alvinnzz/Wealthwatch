import { Flex, Text, Heading, Box } from "@chakra-ui/react";

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
      <Flex justify="center" bg="gray.50" py="2">
        <Box
          p={1}
          borderRightWidth={5}
          borderRightColor={category.color ?? "#f9c7df"}
          borderRightRadius={1}
          width="100%"
          fontWeight="bold"
        >
          {category.category ?? ""}
        </Box>
      </Flex>
    );
  }
}

export default TransactionHistory;
