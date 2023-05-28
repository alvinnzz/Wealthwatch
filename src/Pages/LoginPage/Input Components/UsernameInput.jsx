import { Input, FormLabel, FormControl } from "@chakra-ui/react";

function UsernameInput() {
  return (
    <FormControl isRequired>
      <FormLabel>First name</FormLabel>
      <Input
        placeholder="Username"
        size="lg"
        width="80%"
        borderColor="blackAlpha.600"
        mt="30px"
      />
    </FormControl>
  );
}

export default UsernameInput;
