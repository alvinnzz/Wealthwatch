import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="lg" width="80%" borderColor="blackAlpha.600" mt="15px">
      <FormControl isRequired>
        <Input
          placeholder="Password"
          pr="4.5rem"
          type={show ? "text" : "password"}
          size="lg"
          borderColor="blackAlpha.600"
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
