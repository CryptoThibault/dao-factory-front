import { Box, Button, Text } from "@chakra-ui/react"

const Proposal = (governance, id) => {
  const handleClickYes = async () => {
    await governance.vote(id, 0);
  }
  const handleClickNo = async () => {
    await governance.vote(id, 1);
  }

  return (
    <Box>
      <Text>Proposal {id}</Text>
      <Text>Author</Text>
      <Text>Role</Text>
      <Text>Account</Text>
      <Text>Description</Text>
      <Button onClick={handleClickYes}>Yes</Button>
      <Button onClick={handleClickNo}>No</Button>
    </Box>
  );
};

export default Proposal;