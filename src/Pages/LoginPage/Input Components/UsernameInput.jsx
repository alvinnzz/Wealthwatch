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
        type="text"
        id="username"
        placeholder="Username"
        ml="47px"
        size="lg"
        width="80%"
        borderColor="blackAlpha.600"
        mt="15px"
        onChange={handleUsernameChange}
      />
    </FormControl>
  );
}

export default UsernameInput;
