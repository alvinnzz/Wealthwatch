import { Flex, Box, Text, Container } from "@chakra-ui/react";

const obj = [
  {
    category: "Savings",
    color: "#f9c74f",
    percent: 45,
  },
  {
    category: "Expense",
    color: "#f9c74f",
    percent: 25,
  },
  { category: "Investment", color: "#f9c74f", percent: 30 },
];

function Labels() {
  return (
    <Container mt="25px">
      {obj.map((v, i) => (
        <LabelComponent key={i} data={v}></LabelComponent>
      ))}
    </Container>
  );
}

function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.50"
    >
      <Box
        p={1}
        borderLeftWidth={5}
        borderLeftColor={data.color ?? "#f9c7df"}
        borderLeftRadius={1}
        width="100px"
        fontWeight="bold"
      >
        {data.category ?? ""}
      </Box>
      <Box p={2}>{data.percent ?? 0}</Box>
      {/* Add more CategoryItem components for additional categories */}
    </Flex>
  );
}

export default Labels;
