import { Center, Progress, Text, Box, Stack } from "@chakra-ui/react";

function ProgressBar({ transactionHistory, budget }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  let temp = [...transactionHistory];

  const filteredTransactions = temp.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionYear = transactionDate.getFullYear();
    const transactionMonth = transactionDate.getMonth();

    return transactionYear === currentYear && transactionMonth === currentMonth;
  });

  const totalAmt = filteredTransactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);
  console.log(totalAmt);
  return budget === 0 ? null : totalAmt <= budget ? (
    <Stack direction="column" align="center">
      <Box border="1px solid black" width="50%">
        <Center>
          <Text>Budget: ${budget}</Text>
        </Center>
        <Center>
          <Text>Amount spent this month: ${totalAmt}</Text>
        </Center>
        <Center>
          <Text>
            {((totalAmt / budget) * 100).toFixed(1)}% of budget used up for the
            month
          </Text>
        </Center>
        <Progress
          colorScheme="green"
          height="32px"
          value={totalAmt}
          max={budget}
          width="95%"
          my="2%"
          ml="2.5%"
        />
      </Box>
    </Stack>
  ) : (
    <Stack direction="column" align="center" my="2%">
      <Box border="1px solid black" width="50%">
        <Center>
          <Text mt="2%">Budget: ${budget}</Text>
        </Center>
        <Center>
          <Text>Amount spent this month: ${totalAmt}</Text>
        </Center>
        <Center>
          <Text>
            You have exceeded your budget this month by{" "}
            {(((totalAmt - budget) / budget) * 100).toFixed(1)}%
          </Text>
        </Center>
        <Progress
          colorScheme="red"
          height="32px"
          value={totalAmt}
          max={budget}
          width="95%"
          my="2%"
          ml="2.5%"
        />
      </Box>
    </Stack>
  );
  //   transactionHistory.map((x) => console.log(x.date.getMonth()));
}

export default ProgressBar;
