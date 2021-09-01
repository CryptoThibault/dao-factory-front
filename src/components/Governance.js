import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import { useGovernance } from "../hooks/useGovernance";
import Proposal from "./Proposal";

const Governance = () => {
  const [web3State] = useContext(Web3Context)
  const [governance, governanceState, governanceDispatch] = useGovernance()
  const { token_data, send_account, send_amount, lock_amount, description, account, role, grant, proposals_id, proposals_data } = governanceState

  const handleChangeSendAccount = (e) => {
    governanceDispatch({ type: "CHANGE_SEND_ACCOUNT", payload: e.target.event })
  }
  const handleChangeSendAmount = (e) => {
    governanceDispatch({ type: "CHANGE_SEND_AMOUNT", payload: e.target.event })
  }
  const handleChangeLockAmount = (e) => {
    governanceDispatch({ type: "CHANGE_LOCK_AMOUNT", payload: e.target.event })
  }
  const handleChangeDescription = (e) => {
    governanceDispatch({ type: "CHANGE_DESCRIPTION", payload: e.target.event })
  }
  const handleChangeAccount = (e) => {
    governanceDispatch({ type: "CHANGE_ACCOUNT", payload: e.target.event })
  }
  const handleChangeRole = (e) => {
    governanceDispatch({ type: "CHANGE_ROLE", payload: e.target.event })
  }
  const handleChangeGrant = (e) => {
    governanceDispatch({ type: "CHANGE_GRANT", payload: e.target.event })
  }
  const handleClickSend = async () => {
    await governance.transfer(send_account, send_amount)
  }
  const handleCLickLock = async () => {
    await governance.lock(lock_amount);
  }
  const handleCLickUnlock = async () => {
    await governance.unlock(lock_amount)
  }
  const handleClickPropose = async () => {
    await governance.propose(description, account, ethers.utils.id(role), grant);
  }

  useEffect(() => {
    let ids = []
    let data = [{}]
    let tokenData = {}
    async function getToken() {
      tokenData = {
        name: await governance.name(),
        symbol: await governance.symbol(),
        balance: await governance.balanceOf(web3State.account),
        voting: await governance.votingPower(web3State.account),
      }
    }
    async function getProposals() {
      const id = await governance.nbProposal();
      for (let i = 1; i <= id; i++) {
        ids.push(i)
        data.push({
          description: await governance.descriptionOf(i),
          account: await governance.accountOf(i),
          role: await governance.roleOf(i),
          grant: await governance.grantOf(i),
          author: await governance.authorOf(i),
          nbYes: await governance.nbYes(i),
          nbNo: await governance.nbNo(i),
          createdAt: await governance.creationOf(i),
          status: await governance.statusOf(i),
        })
      }
    }
    getProposals()
    getToken()
    governanceDispatch({ type: "LIST_PROPOSALS", payload: ids })
    governanceDispatch({ type: "UPDATE_PROPOSALS_DATA", payload: data })
    governanceDispatch({ type: "UPDATE_TOKEN_DATA", payload: tokenData })
  }, [governance, governanceDispatch, web3State.account])

  return (
    <Box>
      <Text>Governance</Text>
      <Stack spacing={3}>
        <Text>Personal information</Text>
        <Text>Balance of {token_data.name}: {token_data.balance} {token_data.symbol}</Text>
        <Text>Locked balance: {token_data.voting}</Text>
      </Stack>
      <Stack spacing={3}>
        <Input value={send_account} onChange={handleChangeSendAccount} placeholder="account" />
        <Input value={send_amount} onChange={handleChangeSendAmount} placeholder="amount" />
        <Button onClick={handleClickSend}>Send</Button>
      </Stack>
      <Stack spacing={3}>
        <Input value={lock_amount} onChange={handleChangeLockAmount} placeholder="amount" />
        <Button onClick={handleCLickLock}>Lock</Button>
        <Button onClick={handleCLickUnlock}>Unlock</Button>
      </Stack>
      <Stack spacing={3}>
        <Button>Mint</Button>
        <Button>Burn</Button>
      </Stack>
      <Stack spacing={3}>
        <Text>Submit a Role Proposal</Text>
        <Input value={description} onChange={handleChangeDescription} />
        <Input value={account} onChange={handleChangeAccount} />
        <Input value={role} onChange={handleChangeRole} />
        <Input value={grant} onChange={handleChangeGrant} />
        <Button onClick={handleClickPropose}>Propose</Button>
      </Stack>
      {proposals_id.map(el => {
        return <Proposal governance={governance} id={el} data={proposals_data[el]} />
      })}
    </Box>
  );
};

export default Governance;