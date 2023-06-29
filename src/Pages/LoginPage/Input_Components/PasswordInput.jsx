import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput({ setPassword, invalidCredentials }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <InputGroup size="lg" width="80%" borderColor="blackAlpha.600" mt="15px">
      <FormControl isRequired>
        {invalidCredentials === false ? (
          <Input
            className="form__input"
            id="password"
            placeholder="Password"
            type={show ? "text" : "password"}
            size="lg"
            borderColor="blackAlpha.600"
            onChange={handlePasswordChange}
          />
        ) : (
          <Input
            className="form__input"
            id="password"
            placeholder="Password"
            type={show ? "text" : "password"}
            size="lg"
            borderColor="red.600"
            onChange={handlePasswordChange}
            _hover={{ borderColor: "red.300" }}
            _focus={{ borderColor: "red.300" }}
          />
        )}
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
