import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useDao } from "../hooks/useDao";

const Roles = () => {
  const [dao, daoState, daoDispatch] = useDao()
  const { account, role, grant } = daoState
  const handleChangeAccount = (e) => {
    daoDispatch({ type: "CHANGE_ACCOUNT", payload: e.target.event })
  }
  const handleChangeRole = (e) => {
    daoDispatch({ type: "CHANGE_ROLE", payload: e.target.event })
  }
  const handleChangeGrant = (e) => {
    daoDispatch({ type: "CHANGE_GRANT", payload: e.target.event })
  }

  const handleClickChangeRole = async () => {
    const byteRole = role === 'DEFAULT_ADMIN_ROLE' ? ethers.constants.HashZero : ethers.utils.id(role)
    let tx;
    grant ? tx = await dao.grantRole(byteRole, account) : tx = await dao.revokeRole(byteRole, account)
    await tx.wait()
  }
  const handleClickCheckRole = async () => {
    const byteRole = role === 'DEFAULT_ADMIN_ROLE' ? ethers.constants.HashZero : ethers.utils.id(role)
    console.log(await dao.hasRole(byteRole, account))
  }
  return (
    <Box>
      <Stack>
        <Input value={account} onChange={handleChangeAccount} placeholder="0x0" />
        <Input value={role} onChange={handleChangeRole} placeholder="ADMIN_ROLE" />
        <Input value={grant} onChange={handleChangeGrant} placeholder="true" />
        <Button onClick={handleClickChangeRole}>Change role</Button>
        <Button onClick={handleClickCheckRole}>Check role</Button>
      </Stack>
    </Box>
  )
};

export default Roles;