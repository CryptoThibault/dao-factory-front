import { Box, Button, Text } from "@chakra-ui/react"

const Proposal = (governance, id, proposal) => {
  const handleClickYes = async () => {
    const tx = await governance.vote(id, 0);
    await tx.wait()
  }
  const handleClickNo = async () => {
    const tx = await governance.vote(id, 1);
    await tx.wait()
  }
  console.log(proposal)
  return proposal !== undefined ? (
    <Box>
      <Text fontSize={20} align="center">Proposal {id}</Text>
      <Text>Description: {proposal.description}</Text>
      <Text>Account: {proposal.account} </Text>
      <Text>Role: {proposal.role} </Text>
      <Text>Grant: {proposal.grant} </Text>
      <Text>Number of Yes: {proposal.nbYes} </Text>
      <Text>Number of No: {proposal.nbNo} </Text>
      <Text>Author: {proposal.author} </Text>
      <Text>Created at: {proposal.createdAt}</Text>
      <Text>Status: {proposal.status}</Text>
      <Button onClick={handleClickYes}>Yes</Button>
      <Button onClick={handleClickNo}>No</Button>
      <Text>Vote Used: {proposal.voteUsed}</Text>
    </Box >
  ) : <Text>Proposal is loading</Text>;
};

export default Proposal;