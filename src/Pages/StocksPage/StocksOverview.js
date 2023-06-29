import StockTable from "./Components/StockTable";
import SearchBar from "./Components/SearchBar";
import { ContextProvider } from "./Context";
import { Center } from "@chakra-ui/react";

function StocksOverview() {
  return (
    <ContextProvider>
      <Center mt="4em" fontSize="13px">
        Shortlist your favourite stocks in a table and see their price graph by
        clicking on them below in the table.
      </Center>
      <SearchBar />
      <StockTable />
    </ContextProvider>
  );
}

export default StocksOverview;
