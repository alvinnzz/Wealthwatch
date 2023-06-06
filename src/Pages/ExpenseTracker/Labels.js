import { Box, Spacer, Flex } from "@chakra-ui/react";

function Labels({ graphData }) {
  const copy = [...graphData];
  copy.pop();
  return copy.map((value, index) => {
    if (value !== 0) {
      let color;
      let category;
      switch (index) {
        case 0:
          category = "Food";
          color = "#ad2c2a";
          break;
        case 1:
          category = "Gifts";
          color = "#e3da29";
          break;
        case 2:
          category = "Transport";
          color = "#34ad26";
          break;
        case 3:
          category = "Bills";
          color = "#8c59d4";
          break;
        case 4:
          category = "Entertainment";
          color = "#d4597e";
          break;
        default:
          category = "Others";
          color = "#29c5bf";
          break;
      }

      return (
        <Flex
          key={index}
          p={1}
          bg="gray.50"
          borderLeftWidth={5}
          borderLeftColor={color}
          borderLeftRadius={1}
          height="40px"
          width="100%"
          fontWeight="bold"
        >
          {category}
          <Spacer />
          {Math.floor(value * 100) / 100}
        </Flex>
      );
    }
    return null;
  });
}

export default Labels;
