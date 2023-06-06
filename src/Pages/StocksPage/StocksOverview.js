import StockTable from "./Components/StockTable";
import SearchBar from "./Components/SearchBar";
import { ContextProvider } from "./Context";

function StocksOverview() {
  return (
    <ContextProvider>
      <SearchBar />
      <StockTable />
    </ContextProvider>
  );
}

export default StocksOverview;
