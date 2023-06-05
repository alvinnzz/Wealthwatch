import { Text } from "@chakra-ui/react";
import StockTable from "./Components/StockTable";
import SearchBar from "./Components/SearchBar";
import { ContextProvider } from "./Context";

// Stocks api key: chumt4pr01qphnn2bo7gchumt4pr01qphnn2bo80

function StocksOverview() {
  return (
    <ContextProvider>
      <SearchBar />
      <StockTable />
    </ContextProvider>
  );
}

export default StocksOverview;
