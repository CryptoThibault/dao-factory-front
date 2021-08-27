import { Box, Button, Text } from "@chakra-ui/react"

const Proposal = () => {
  return (
    <Box>
      <Text>Proposal ID</Text>
      <Text>Author</Text>
      <Text>Role</Text>
      <Text>Account</Text>
      <Text>Description</Text>
      <Button>Yes</Button>
      <Button>No</Button>
    </Box>
  );
};

export default Proposal;