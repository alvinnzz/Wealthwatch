import { Box, Input, Text, List, ListItem, Center } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { Context } from "../Context";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock, watchList } = useContext(Context);
  const { addStock, watchList } = useContext(Context);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        isMounted && setResults(response.data.result);
      } catch (err) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const renderDropdown = () => {
    return search ? (
      <Box
        position="absolute"
        top="42px"
        bg="gray.50"
        width="29%"
        boxShadow="sm"
        zIndex={1}
      >
        <List h="350px" overflowY="scroll" overflowX="hidden">
          {results.map((result) => {
            return (
              <ListItem
                key={result.symbol}
                cursor="pointer"
                _hover={{ bg: "gray.200" }}
                onClick={() => {
                  addStock(result.symbol);
                  setSearch("");
                }}
              >
                {result.description} ({result.symbol})
              </ListItem>
            );
          })}
        </List>
      </Box>
    ) : (
      <></>
    );
  };

  return (
    <>
      {watchList.length > 2 ? (
        <Center>
          <Text bg="gray.50" color="red.800" mt="1em" mb="5em">
            Max number of stocks hit (3),remove a stock before proceeding
          </Text>
        </Center>
      ) : (
        <Center position="relative" mt="1em" mb="5em">
          <Input
            bg="rgba(145, 158, 171, 0.04)"
            id="search"
            type="text"
            placeholder="Search for a stock"
            autoComplete="off"
            _focus={{ outline: "none" }}
            onChange={handleInputChange}
            width="30%"
            value={search}
          />

          {renderDropdown()}
        </Center>
      )}
    </>
  );
}

export default SearchBar;
