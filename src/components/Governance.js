import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useGovernance } from "../hooks/useGovernance";
import Proposal from "./Proposal";

const Governance = () => {
  const [governance, governanceState, governanceDispatch] = useGovernance()
  const { lockAmount, description, account, role, grant, proposals_id, proposals_data } = governanceState

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
  const handleCLickLock = async () => {
    await governance.lock(lockAmount);
  }
  const handleCLickUnlock = async () => {
    await governance.unlock(lockAmount)
  }
  const handleClickPropose = async () => {
    await governance.propose(description, account, role, grant);
  }

  useEffect(() => {
    let ids = []
    let data = [{}]
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
    governanceDispatch({ type: "LIST_PROPOSALS", payload: ids })
    governanceDispatch({ type: "UPDATE_PROPOSALS_DATA", payload: data })
  }, [governance, governanceDispatch])

  return (
    <Box>
      <Text>Governance</Text>
      <Stack>
        <Text>Personal information</Text>
        <Text>Balance of name(): balanceOf()</Text>
        <Text>Locked balance: votingPower()</Text>
      </Stack>
      <Stack spacing={3}>
        <Input value={lockAmount} onChange={handleChangeLockAmount} placeholder="amount" />
        <Button onClick={handleCLickLock}>Lock</Button>
        <Button onClick={handleCLickUnlock}>Unlock</Button>
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