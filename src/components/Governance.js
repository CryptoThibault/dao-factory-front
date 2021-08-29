import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useGovernance } from "../hooks/useGovernance";
import Proposal from "./Proposal";

const Governance = () => {
  const [governance, governanceState, governanceDispatch] = useGovernance()
  const { description, account, role, grant, proposals_id } = governanceState

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
  const handleClickPropose = async () => {
    await governance.propose(description, account, role, grant);
  }

  useEffect(() => {
    let ids = []
    async function getIds() {
      const id = await governance.nbProposal();
      for (let i = 1; i <= id; i++) { ids.push(i) }
    }
    getIds()
    governanceDispatch({ type: "LIST_PROPOSALS", payload: ids })
  }, [governance, governanceDispatch])

  return (
    <Box>
      <Text>Governance</Text>
      <Stack spacing={3}>
        <Text>Submit a Role Proposal</Text>
        <Input value={description} onChange={handleChangeDescription} />
        <Input value={account} onChange={handleChangeAccount} />
        <Input value={role} onChange={handleChangeRole} />
        <Input value={grant} onChange={handleChangeGrant} />
        <Button onClick={handleClickPropose}>Propose</Button>
      </Stack>
      {proposals_id.map(el => {
        return <Proposal governance={governance} id={el} />
      })}
    </Box>
  );
};

export default Governance;