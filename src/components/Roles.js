import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Select, Stack, Switch, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useDao } from "../hooks/useDao";

const Roles = () => {
  const [dao, daoState, daoDispatch] = useDao()
  const { account, role, grant, isRole } = daoState
  const handleChangeAccount = (e) => {
    console.log(e.target.value)
    daoDispatch({ type: "CHANGE_ACCOUNT", payload: e.target.value })
  }
  const handleChangeRole = (e) => {
    daoDispatch({ type: "CHANGE_ROLE", payload: e.target.value })
  }
  const handleChangeGrant = () => {
    daoDispatch({ type: "CHANGE_GRANT", payload: !grant })
  }

  const handleClickChangeRole = async () => {
    const byteRole = role === 'DEFAULT_ADMIN_ROLE' ? ethers.constants.HashZero : ethers.utils.id(role)
    let tx;
    grant ? tx = await dao.grantRole(byteRole, account) : tx = await dao.revokeRole(byteRole, account)
    await tx.wait()
  }
  const handleClickCheckRole = async () => {
    const byteRole = role === 'DEFAULT_ADMIN_ROLE' ? ethers.constants.HashZero : ethers.utils.id(role)
    const tx = await dao.hasRole(byteRole, account)
    console.log(tx)
    daoDispatch({ type: "CHANGE_ISROLE", payload: tx })
  }
  return (
    <Box margin={3} padding={3} border="2px solid white">
      <Text fontSize={30} align="center" margin={5}>Roles dashboard</Text>
      <Stack spacing={3}>
        <InputGroup>
          <InputLeftAddon children="Account" />
          <Input value={account} onChange={handleChangeAccount} placeholder="0x0" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Role" />
          <Select value={role} onChange={handleChangeRole} >
            <option value="DEFAULT_ADMIN_ROLE" defaultValue>DEFAULT_ADMIN_ROLE</option>
            <option value="ADMIN_ROLE">ADMIN_ROLE</option>
            <option value="PROPOSER_ROLE">PROPOSER_ROLE</option>
            <option value="MINTER_ROLE">MINTER_ROLE</option>
            <option value="BURNER_ROLE">BURNER_ROLE</option>
            <option value="MANAGER_ROLE">MANAGER_ROLE</option>
            <option value="TREASURIER_ROLE">TREASURIER_ROLE</option>
          </Select>
        </InputGroup>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="grant">Grant or Revoke</FormLabel>
          <Switch id="grant" value={grant} onChange={handleChangeGrant} defaultChecked />
        </FormControl>
        <Button onClick={handleClickChangeRole}>Change role</Button>
        <Button onClick={handleClickCheckRole}>Check role</Button>
        <Text align="center">{`This user do ${isRole ? '' : 'not'} have this role`}</Text>
      </Stack>
    </Box>
  )
};

export default Roles;