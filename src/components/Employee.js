import { Box, Text } from "@chakra-ui/react";

const Employee = ({ management, account }) => {
  return (
    <Box>
      <Text>Address: {account}</Text>
      <Text>Salary</Text>
      <Text>Employed at</Text>
      <Text>Last Payout</Text>
    </Box>
  );
};

export default Employee;