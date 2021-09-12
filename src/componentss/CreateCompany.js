import { Box, Button, Input, Stack } from "@chakra-ui/react"
import { useDaoFactory } from "../hooks/useDaoFactory";

const CreateCompany = () => {
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
  }

  return (
    <Box>
      <Stack spacing={3}>
        <Input placeholder="Example" value={name} onChange={handleChangeName} />
        <Input placeholder="https://example.com" value={url} onChange={handleChangeUrl} />
        <Input placeholder="Example Governance Token" value={tokenName} onChange={handleChangeTokenName} />
        <Input placeholder="EGT" value={tokenSymbol} onChange={handleChangeTokenSymbol} />
        <Button onClick={handleClickGenerate}>Generate Company</Button>
      </Stack>
    </Box>
  );
};

export default CreateCompany;