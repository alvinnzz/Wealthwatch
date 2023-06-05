import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
import { Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function StockData({ symbol }) {
  const [stockData, setStockData] = useState();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        console.log(response);
        isMounted && setStockData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);
  return (
    <div>
      {stockData && (
        <SimpleGrid
          columns={3}
          spacing={4}
          ml="3em"
          mt="3em"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="2px"
          mr="3em"
        >
          {/* Column 1 */}
          <div>
            <Text>Name: {stockData.name}</Text>
          </div>
          <div>
            <Text>Country: {stockData.country}</Text>
          </div>
          <div>
            <Text>Ticker: {stockData.ticker}</Text>
          </div>
          {/* Column 2 */}
          <div>
            <Text>Exchange: {stockData.exchange}</Text>
          </div>
          <div>
            <Text>Industry: {stockData.finnhubIndustry}</Text>
          </div>
          <div>
            <Text>IPO: {stockData.ipo}</Text>
          </div>
          {/* Column 3 */}
          <div>
            <Text>MarketCap: {stockData.marketCapitalization}</Text>
          </div>
          <div>
            <Text>Outstanding Shares: {stockData.shareOutstanding}</Text>
          </div>
          <div>
            <Text color="teal">
              URL:{" "}
              <Link href={stockData.weburl} isExternal>
                {stockData.weburl}
              </Link>
            </Text>
          </div>
        </SimpleGrid>
      )}
    </div>
  );
}

export default StockData;
