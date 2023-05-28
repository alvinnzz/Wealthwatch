import { Input, FormLabel, FormControl } from "@chakra-ui/react";

function UsernameInput() {
  return (
    <FormControl isRequired>
      <Input
        placeholder="Username"
        ml="55px"
        size="lg"
        width="80%"
        borderColor="blackAlpha.600"
        mt="15px"
      />
    </FormControl>
  );
}

export default UsernameInput;
