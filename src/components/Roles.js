import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext } from "react";
import { Web3Context } from "web3-hooks";
import { useDao } from "../hooks/useDao";

const Roles = () => {
  const [web3State] = useContext(Web3Context)
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
    const byteRole = ethers.utils.id(role)
    let tx;
    grant ? tx = await dao.grantRole(byteRole, account) : tx = await dao.revokeRole(byteRole, account)
    await tx.wait()
  }
  const checkRole = async (role) => {
    return await dao.hasRole(role, web3State.account)
  }
  return (
    <Box>
      {checkRole(ethers.constants.HashZero) || checkRole(ethers.utils.id("ADMIN_ROLE")) ? (
        <Stack>
          <Input value={account} onChange={handleChangeAccount} placeholder="0x0" />
          <Input value={role} onChange={handleChangeRole} placeholder="ADMIN_ROLE" />
          <Input value={grant} onChange={handleChangeGrant} placeholder="true" />
          <Button onClick={handleClickChangeRole}>Change role</Button>
        </Stack>) : <></>}
    </Box>
  )
};

export default Roles;