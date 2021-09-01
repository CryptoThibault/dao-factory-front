import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext } from "react";
import { Web3Context } from "web3-hooks";
import { useDao } from "../hooks/useDao";
import Governance from "./Governance"
import Management from "./Management"
import Treasury from "./Treasury"

const DashboardCompany = ({ id, data }) => {
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
    grant ? await dao.grantRole(byteRole, account) : await dao.revokeRole(byteRole, account)
  }
  const checkRole = async (role) => {
    return await dao.hasRole(ethers.utils.id(role), web3State.account)
  }
  return (
    <Box>
      <Stack>
        <Text>Business information</Text>
        <Text>Name: {data.name}</Text>
        <Text>Url: {data.url}</Text>
        <Text>Author: {data.author}</Text>
        <Text>Created at: {data.createdAt}</Text>
        <Text>Contract Address: {data.daoAddress}</Text>
        <Text>Id: {id}</Text>
      </Stack>
      <Governance />
      <Treasury />
      <Management />
      {checkRole("DEFAULT_ADMIN_ROLE") || checkRole("ADMIN_ROLE") ? (
        <Stack>
          <Input value={account} onChange={handleChangeAccount} placeholder="0x0" />
          <Input value={role} onChange={handleChangeRole} placeholder="ADMIN_ROLE" />
          <Input value={grant} onChange={handleChangeGrant} placeholder="true" />
          <Button onClick={handleClickChangeRole}>Change role</Button>
        </Stack>
      ) : <></>}
    </Box>
  );
};

export default DashboardCompany;