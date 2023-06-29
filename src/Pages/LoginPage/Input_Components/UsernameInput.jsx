import { Input, FormControl, InputGroup } from "@chakra-ui/react";

function UsernameInput({ setUsername }) {
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  return (
    <InputGroup size="lg" width="80%" borderColor="blackAlpha.600" mt="15px">
      <FormControl isRequired>
        <Input
          className="form__input"
          type="text"
          id="username"
          placeholder="Username"
          size="lg"
          borderColor="blackAlpha.600"
          onChange={handleUsernameChange}
        />
      </FormControl>
    </InputGroup>
  );
}

export default UsernameInput;
