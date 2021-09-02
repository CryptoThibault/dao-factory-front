import { Box, Text } from "@chakra-ui/react";

const Employee = ({ management, id, data }) => {
  return (
    <Box>
      <Text>Address: {data.account}</Text>
      <Text>Salary: {data.salary}</Text>
      <Text>Employed at {data.employed_at}</Text>
      <Text>Last Payout: {data.last_payout}</Text>
    </Box>
  );
};

export default Employee;