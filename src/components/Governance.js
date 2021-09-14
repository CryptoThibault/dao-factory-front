import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Switch, Text } from "@chakra-ui/react";
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
  const handleChangeGrant = () => {
    governanceDispatch({ type: "CHANGE_GRANT", payload: !grant })
  }
  const handleClickSend = async () => {
    const tx = await governance.transfer(send_account, send_amount)
    await tx.wait()
  }
  const handleClickMint = async () => {
    const tx = await governance.mint(send_account, send_amount)
    await tx.wait()
  }
  const handleClickBurn = async () => {
    const tx = await governance.burn(send_account, send_amount)
    await tx.wait()
  }
  const handleCLickLock = async () => {
    const tx = await governance.lock(lock_amount);
    await tx.wait()
  }
  const handleCLickUnlock = async () => {
    const tx = await governance.unlock(lock_amount)
    await tx.wait()
  }
  const handleClickPropose = async () => {
    const tx = await governance.propose(description, account, ethers.utils.id(role), grant);
    await tx.wait()
  }

  useEffect(() => {
    async function getToken() {
      governanceDispatch({
        type: "UPDATE_TOKEN_DATA", payload: {
          name: await governance.name(),
          symbol: await governance.symbol(),
          balance: Number((await governance.balanceOf(web3State.account)).toString()),
          voting: Number((await governance.votingPower(web3State.account)).toString()),
        }
      })
    }
    async function getProposals() {
      let ids = []
      let data = [{}]
      const id = await governance.nbProposal();
      for (let i = 1; i <= Number(id.toString()); i++) {
        ids.push(i)
        data.push({
          description: await governance.descriptionOf(i),
          account: await governance.accountOf(i),
          role: await governance.roleOf(i),
          grant: await governance.grantOf(i),
          author: await governance.authorOf(i),
          nbYes: Number((await governance.nbYes(i)).toString()),
          nbNo: Number((await governance.nbNo(i)).toString()),
          createdAt: Number((await governance.creationOf(i)).toString()),
          status: await governance.statusOf(i),
          voteUsed: Number((await governance.voteUsed(web3State.account, i)).toString()),
        })
      }
      governanceDispatch({ type: "LIST_PROPOSALS", payload: ids })
      governanceDispatch({ type: "UPDATE_PROPOSALS_DATA", payload: data })
    }
    if (governance || web3State.account) {
      getProposals()
      getToken()
    }
  }, [governance, governanceDispatch, web3State.account])

  return (
    <Box margin={5}>
      <Text fontSize={30} align="center">Governance</Text>
      <Stack spacing={3}>
        <Text>Personal information</Text>
        <Text>Balance of {token_data.name}: {token_data.balance} {token_data.symbol}</Text>
        <Text>Locked balance: {token_data.voting} {token_data.symbol}</Text>
      </Stack>
      <Text fontSize={20} align="center">ERC20 dashboard</Text>
      <Stack spacing={3} margin={5}>
        <InputGroup>
          <InputLeftAddon children="Account :" />
          <Input value={send_account} onChange={handleChangeSendAccount} placeholder="0x0" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Ammount :" />
          <Input value={send_amount} onChange={handleChangeSendAmount} placeholder="10" />
          <InputRightAddon children={token_data.symbol} />
        </InputGroup>
        <Stack display="flex">
          <Button onClick={handleClickSend}>Send</Button>
          <Button onClick={handleClickMint}>Mint</Button>
          <Button onClick={handleClickBurn}>Burn</Button>
        </Stack>
      </Stack>
      <Stack spacing={3} margin={5}>
        <InputGroup>
          <InputLeftAddon children="Lock amount :" />
          <Input value={lock_amount} onChange={handleChangeLockAmount} placeholder="10" />
        </InputGroup>
        <Button onClick={handleCLickLock}>Lock</Button>
        <Button onClick={handleCLickUnlock}>Unlock</Button>
      </Stack>
      <Text fontSize={20} align="center">Submit a Role Proposal</Text>
      <Stack spacing={3} margin={5}>
        <InputGroup>
          <InputLeftAddon children="Description :" />
          <Input value={description} onChange={handleChangeDescription} placeholder="Proposal for change role of a user" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Account :" />
          <Input value={account} onChange={handleChangeAccount} placeholder="0x0" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Role :" />
          <Select value={role} onChange={handleChangeRole} placeholder="Select role" >
            <option value="DEFAULT_ADMIN_ROLE">DEFAULT_ADMIN_ROLE</option>
            <option value="ADMIN_ROLE">ADMIN_ROLE</option>
            <option value="PROPOSER_ROLE">PROPOSER_ROLE</option>
            <option value="MINTER_ROLE">MINTER_ROLE</option>
            <option value="BURNER_ROLE">BURNER_ROLE</option>
            <option value="MANAGER_ROLE">MANAGER_ROLE</option>
            <option value="TREASURIER_ROLE">TREASURIER_ROLE</option>
          </Select>
        </InputGroup>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="grant">Grant or Revoke ?</FormLabel>
          <Switch id="grant" value={grant} onChange={handleChangeGrant} defaultChecked="true" />
        </FormControl>
        <Button onClick={handleClickPropose}>Propose</Button>
      </Stack>
      <Box>
        {proposals_id.map(el => {
          return <Proposal governance={governance} id={el} data={proposals_data[el]} />
        })}
      </Box>
    </Box>
  );
};

export default Governance;