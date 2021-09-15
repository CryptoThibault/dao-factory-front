import { Box, Button, Text } from "@chakra-ui/react"
import SimpleDateTime from 'react-simple-timestamp-to-date';

const Proposal = ({ governance, id, proposal }) => {
  const handleClickYes = async () => {
    const tx = await governance.vote(id, 0);
    await tx.wait()
  }
  const handleClickNo = async () => {
    const tx = await governance.vote(id, 1);
    await tx.wait()
  }
  const status = !proposal.status ? 'Running' : proposal.status === 1 ? 'Approved' : 'Rejected'
  return proposal !== undefined ? (
    <Box>
      <Text fontSize={20} align="center">Proposal {id}</Text>
      <Text>Description: {proposal.description}</Text>
      <Text>Account: {proposal.account} </Text>
      <Text>Role: {proposal.role} </Text>
      <Text>Action: {proposal.grant ? 'Grant' : 'Revoke'} </Text>
      <Text>Number of Yes: {proposal.nbYes} </Text>
      <Text>Number of No: {proposal.nbNo} </Text>
      <Text>Author: {proposal.author} </Text>
      <Text>Created the: <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{proposal.createdAt}</SimpleDateTime></Text>
      <Text>Status: {status}</Text>
      <Button onClick={handleClickYes}>Yes</Button>
      <Button onClick={handleClickNo}>No</Button>
      <Text>Vote Used: {proposal.voteUsed}</Text>
    </Box >
  ) : <Text>Proposal is loading</Text>;
};

export default Proposal;