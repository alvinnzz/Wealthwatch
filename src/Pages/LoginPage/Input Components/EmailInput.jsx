import { Input } from "@chakra-ui/react";

function EmailInput({ setEmail }) {
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  return (
    <Input
      type="email"
      id="email"
      className="form__input"
      placeholder="Email"
      size="lg"
      width="80%"
      borderColor="blackAlpha.600"
      mt="15px"
      onChange={handleEmailChange}
    ></Input>
  );
}

export default EmailInput;
