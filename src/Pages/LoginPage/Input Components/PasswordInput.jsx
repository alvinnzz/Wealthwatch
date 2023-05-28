import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput({ setPassword }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <InputGroup size="lg" width="80%" borderColor="blackAlpha.600" mt="15px">
      <FormControl isRequired>
        <Input
          className="form__input"
          id="password"
          placeholder="Password"
          type={show ? "text" : "password"}
          size="lg"
          borderColor="blackAlpha.600"
          onChange={handlePasswordChange}
        />
      </FormControl>
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
