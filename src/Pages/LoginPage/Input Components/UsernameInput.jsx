import { Input, FormControl } from "@chakra-ui/react";

function UsernameInput({ setUsername }) {
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  return (
    <FormControl isRequired>
      <Input
        className="form__input"
        id="username"
        placeholder="username"
        width="80%"
        size="lg"
        borderColor="blackAlpha.600"
        mt="15px"
        ml="10%"
        onChange={handleUsernameChange}
      />
    </FormControl>
  );
}

export default UsernameInput;
