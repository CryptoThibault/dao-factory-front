import { Box, Button, Text } from "@chakra-ui/react"

const Proposal = (governance, id, data) => {
  const handleClickYes = async () => {
    await governance.vote(id, 0);
  }
  const handleClickNo = async () => {
    await governance.vote(id, 1);
  }

  return (
    <Box>
      <Text>Proposal {id}</Text>
      <Text>Description: {data.description}</Text>
      <Text>Account: {data.account} </Text>
      <Text>Role: {data.role} </Text>
      <Text>Grant: {data.grant} </Text>
      <Text>Number of Yes: {data.nbYes} </Text>
      <Text>Number of No: {data.nbNo} </Text>
      <Text>Author: {data.author} </Text>
      <Text>Created at: {data.createdAt}</Text>
      <Text>Status: {data.status}</Text>
      <Button onClick={handleClickYes}>Yes</Button>
      <Button onClick={handleClickNo}>No</Button>
      <Text>Voting power: </Text>
      <Text>Vote Used: </Text>
    </Box >
  );
};

export default Proposal;