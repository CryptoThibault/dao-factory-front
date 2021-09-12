import { useDaoFactory } from "../hooks/useDaoFactory";
import { Box, Button, Input, InputGroup, InputLeftAddon, Stack, Text } from "@chakra-ui/react";

const DaoFactory = ({ listUp }) => {
  const [daoFactory, daoFactoryState, daoFactoryDispatch] = useDaoFactory()
  const { name, url, tokenName, tokenSymbol } = daoFactoryState

  const handleChangeName = (e) => {
    daoFactoryDispatch({ type: "CHANGE_NAME", payload: e.target.value })
  }
  const handleChangeUrl = (e) => {
    daoFactoryDispatch({ type: "CHANGE_URL", payload: e.target.value })
  }
  const handleChangeTokenName = (e) => {
    daoFactoryDispatch({ type: "CHANGE_TOKEN_NAME", payload: e.target.value })
  }
  const handleChangeTokenSymbol = (e) => {
    daoFactoryDispatch({ type: "CHANGE_TOKEN SYMBOL", payload: e.target.value })
  }
  const handleClickGenerate = async () => {
    await daoFactory.create(name, url, tokenName, tokenSymbol);
    listUp(true);
  }

  return (
    <Box margin={5}>
      <Text fontSize={20} margin={2}>Create a dao</Text>
      <Stack spacing={3}>
        <InputGroup>
          <InputLeftAddon children="Company name :" />
          <Input placeholder="Example" value={name} onChange={handleChangeName} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Company Url :" />
          <Input placeholder="example.com" value={url} onChange={handleChangeUrl} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Governance token name :" />
          <Input placeholder="Example Governance Token" value={tokenName} onChange={handleChangeTokenName} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Governance token symbol :" />
          <Input placeholder="EGT" value={tokenSymbol} onChange={handleChangeTokenSymbol} />
        </InputGroup>
        <Button onClick={handleClickGenerate}>Generate Company</Button>
      </Stack>
    </Box>
  )
};

export default DaoFactory;